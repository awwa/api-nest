import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Request } from 'express';
import { ValidationPipe } from '../validation.pipe';

@Controller('cars')
export class CarsController {
  private readonly logger = new Logger(CarsController.name);

  constructor(private readonly carsService: CarsService) {}

  /**
   * 新しいクルマを登録する
   */
  @Post()
  async create(@Body(new ValidationPipe()) createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  /**
   * リクエストで指定した条件に該当するクルマ配列を取得する
   */
  @Get()
  findAll(@Req() request: Request): string {
    this.logger.log(request.query);
    this.logger.debug(request.query);
    this.logger.verbose(request.query);
    this.logger.warn(request.query);
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (id === 'forbidden') {
      throw new ForbiddenException('hoge');
    }
    if (id === 'internalservererror') {
      throw new InternalServerErrorException('fuga');
    }
    return this.carsService.remove(+id);
  }
}
