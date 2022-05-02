import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3ModuleOptions, S3OptionsFactory } from 'src/aws/s3/s3.types';

@Injectable()
export class S3ConfigService implements S3OptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createS3Options(): S3ModuleOptions {
    return {
      region: this.configService.get<string>('s3.region') as string,
      accessKeyId: this.configService.get<string>('aws.accessKeyId') as string,
      secretAccessKey: this.configService.get<string>('aws.secretAccessKey') as string,
      publicBucket: this.configService.get<string>('s3.publicBucket'),
      privateBucket: this.configService.get<string>('s3.privateBucket'),
      putActionExpiresSec: this.configService.get<number>('s3.putActionExpiresSec'),
      getActionExpiresSec: this.configService.get<number>('s3.getActionExpiresSec'),
    };
  }
}
