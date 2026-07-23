import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const swaggerTitle = configService.get<string>('swagger.title', 'G-Scores API');
  const swaggerDesc = configService.get<string>('swagger.description', 'Tài liệu API cho hệ thống G-Scores');
  const swaggerVersion = configService.get<string>('swagger.version', '1.0');
  const swaggerPath = configService.get<string>('swagger.path', 'api/docs');

  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDesc)
    .setVersion(swaggerVersion)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, document);

  const port = configService.get<number>('app.port', 3000);
  await app.listen(port);
}
bootstrap();
