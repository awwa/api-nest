import { dump } from 'js-yaml';
import * as path from 'path';
import { AppModule } from '../app.module';
import { NestFactory } from '@nestjs/core';
import { writeFileSync } from 'fs';
import OpenAPIDocument from './openapi-document';

const exportOpenAPIDocument = async () => {
  const app = await NestFactory.create(AppModule);
  const outputPath = path.resolve(process.cwd(), 'openapi.yaml');
  writeFileSync(outputPath, dump(OpenAPIDocument(app), {}));
};

(async () => await exportOpenAPIDocument())();
