import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from './middlewares/logger.middleware';

async function bootstrap(): Promise<void> {
  const app: INestApplication =
    await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(logger);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
