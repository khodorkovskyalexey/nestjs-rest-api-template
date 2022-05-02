import { Module } from '@nestjs/common';
import { S3ConfigService } from 'src/common/services';
import { AwsController } from './controllers';
import { S3Module } from './s3';

@Module({
  imports: [
    S3Module.forRootAsync({
      useClass: S3ConfigService,
    }),
  ],
  controllers: [AwsController],
})
export class AwsModule {}
