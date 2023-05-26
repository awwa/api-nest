import { dump } from 'js-yaml';
import * as path from 'path';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { writeFileSync } from 'fs';

const exportOpenAPIDocument = async () => {
  const app = await NestFactory.create(AppModule);

  const options: SwaggerDocumentOptions = {
    // deepScanRoutes: true,
  };
  const config = new DocumentBuilder()
    .setTitle('Cars example')
    .setDescription('The cars API description')
    .setVersion('1.0')
    .addTag('cars')
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  const outputPath = path.resolve(process.cwd(), 'openapi.yaml');
  writeFileSync(outputPath, dump(document, {}));
};

(async () => await exportOpenAPIDocument())();
