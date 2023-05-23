import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [ConfigModule],
})
export class CarsModule {}
