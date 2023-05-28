import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { ConfigModule } from '@nestjs/config';
// import { PaginatedDto } from 'src/openapi/paginated-dto';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [ConfigModule],
})
export class CarsModule {}
