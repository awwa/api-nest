import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export default (app: INestApplication) => {
  const options: SwaggerDocumentOptions = {
    // deepScanRoutes: true,
  };
  const config = new DocumentBuilder()
    .setTitle('Cars example')
    .setDescription('The cars API description')
    .setVersion('1.0')
    .addTag('cars')
    .build();
  return SwaggerModule.createDocument(app, config, options);
};
