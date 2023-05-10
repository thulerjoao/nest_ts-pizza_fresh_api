import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useStaticAssets(join(__dirname, '..', 'client'));

  const config = new DocumentBuilder()
    .setTitle('PizzaFresh')
    .setDescription('Application for managing the tables of a pizzeria')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('user')
    .addTag('table')
    .addTag('product')
    .addTag('order')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
