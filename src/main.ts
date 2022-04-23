import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const useSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('NestJS API')
    .setVersion('0.0.1')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);
  const env = configService.get<string>('environment');
  const port = configService.get<number>('port');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  if (env === 'development' || env === 'staging') {
    useSwagger(app);
  } else {
    Logger.debug = () => {
      //disabled in production
    };
    Logger.verbose = () => {
      //disabled in production
    };
  }

  await app.listen(port, () => {
    Logger.log(`Running on port ${port}`, 'NestApplication');
    Logger.log(`Environment ${env}`, 'NestApplication');
  });
}
bootstrap();
