import { ModuleMetadata, Type } from '@nestjs/common';

export const S3_OPTIONS_PROVIDER_NAME = 'S3_MODULE_OPTIONS';

export declare type S3ModuleOptions = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  endpoint?: string;
  privateBucket?: string;
  publicBucket?: string;
  putActionExpiresSec?: number;
  getActionExpiresSec?: number;
};

export interface S3OptionsFactory {
  createS3Options(): Promise<S3ModuleOptions> | S3ModuleOptions;
}

export interface S3ModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (...args: any[]) => Promise<S3ModuleOptions> | S3ModuleOptions;
  useClass?: Type<S3OptionsFactory>;
  inject?: any[];
}
