import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exception.filter';
import { SwaggerModule } from '@nestjs/swagger';
import OpenAPIDocument from './openapi/openapi-document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  SwaggerModule.setup('api', app, OpenAPIDocument(app));
  await app.listen(3100);
}
bootstrap();
