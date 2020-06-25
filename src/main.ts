import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { StorageConfig } from 'config/storage.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(StorageConfig.video.destination, {
    prefix: StorageConfig.video.urlPrefix,
    maxAge: StorageConfig.video.maxAge,
    index: false,
  });

  await app.listen(3000);
}
bootstrap();
