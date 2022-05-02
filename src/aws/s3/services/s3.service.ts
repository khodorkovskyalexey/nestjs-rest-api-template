import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { getFileExt } from 'src/utils';
import { GetSignedUrlDto } from '../dtos';
import { BucketType, FileActions, S3FileCategory } from '../s3.enums';
import { S3ModuleOptions, S3_OPTIONS_PROVIDER_NAME } from '../s3.types';

@Injectable()
export class S3Service {
  private _client: S3;

  constructor(
    @Inject(S3_OPTIONS_PROVIDER_NAME)
    private readonly options: S3ModuleOptions,
  ) {
    this._client = this.createS3FromOptions();
  }

  private get client() {
    return this._client;
  }

  private createS3FromOptions(): S3 {
    return new S3({
      signatureVersion: 'v4',
      region: this.options.region,
      credentials: {
        accessKeyId: this.options.accessKeyId,
        secretAccessKey: this.options.secretAccessKey,
      },
      endpoint: this.options.endpoint,
    });
  }

  private _getBucketName(bucket: BucketType) {
    if (bucket === BucketType.public) {
      return this.options.publicBucket;
    } else {
      return this.options.privateBucket;
    }
  }

  async getSignedUrl(
    userId: string,
    { fileName, fileCategory, action, contentType }: GetSignedUrlDto,
  ): Promise<string> {
    let fileKey: string;
    let bucket: BucketType;

    const extension = getFileExt(fileName);
    const timestamp = `c_${new Date().getTime()}.${extension}`;

    switch (fileCategory) {
      case S3FileCategory.FILE:
        fileKey = `${fileCategory}/${userId}/${timestamp}`;
        bucket = BucketType.public;
        break;
      default:
        throw new UnprocessableEntityException('Select bucket does not exist');
    }

    const writeParams = {
      Bucket: this._getBucketName(bucket),
      Expires: action === FileActions.putObject ? this.options.putActionExpiresSec : this.options.getActionExpiresSec,
      Key: fileKey,
    } as any;

    if (action === FileActions.putObject && contentType) {
      writeParams.ContentType = contentType;
    }

    return new Promise((resolve, reject) => {
      this.client.getSignedUrl(action, writeParams, (err, url) => {
        if (err) {
          return reject(err);
        }
        return resolve(url);
      });
    });
  }
}
