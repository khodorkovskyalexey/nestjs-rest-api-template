import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { S3Service } from './services';
import { S3ModuleAsyncOptions, S3OptionsFactory, S3_OPTIONS_PROVIDER_NAME } from './s3.types';

@Module({})
export class S3Module {
  static defaultOptions = {
    privateBucket: 'private',
    publicBucket: 'public',
    putActionExpiresSec: 300,
    getActionExpiresSec: 500,
  };

  static forRootAsync(options: S3ModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: S3Module,
      imports: options.imports,
      providers: [...asyncProviders, S3Service],
      exports: [S3Service],
    };
  }

  private static createAsyncProviders(options: S3ModuleAsyncOptions): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<S3OptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: S3ModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: S3_OPTIONS_PROVIDER_NAME,
        useFactory: { ...S3Module.defaultOptions, ...options.useFactory } as any,
        inject: options.inject || [],
      };
    }

    const inject = [options.useClass as Type<S3OptionsFactory>];

    return {
      provide: S3_OPTIONS_PROVIDER_NAME,
      useFactory: async (optionsFactory: S3OptionsFactory) => {
        const options = await optionsFactory.createS3Options();
        return { ...S3Module.defaultOptions, ...options };
      },
      inject,
    };
  }
}
