import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { QueryCarDto } from './dto/query-car.dto';
import { ValidationPipe } from '../validation.pipe';
import { ConfigService } from '@nestjs/config';
import { Car } from './entities/car.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('cars')
export class CarsController {
  private readonly logger = new Logger(CarsController.name);

  constructor(
    private readonly carsService: CarsService,
    private configService: ConfigService,
  ) {}

  /**
   * 新しいクルマを登録する
   */
  @Post()
  async create(@Body(new ValidationPipe()) createCarDto: CreateCarDto) {
    const dbUser = this.configService.get<string>('DATABASE_USER', 'localhost');
    this.logger.log(dbUser);
    const dbPassword = this.configService.get<string>(
      'DATABASE_PASSWORD',
      'password',
    );
    this.logger.log(dbPassword);
    const port = this.configService.get('PORT', { infer: true });
    this.logger.log(port);
    return this.carsService.create(createCarDto);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Car })
  findOne(@Param('id') id: string): Car {
    return this.carsService.findOne(id);
  }

  /**
   * リクエストで指定した条件に該当するクルマ配列を取得する
   */
  @Get()
  findByQuery(@Query(new ValidationPipe()) query: QueryCarDto): Array<Car> {
    this.logger.verbose(query.modelName);
    return this.carsService.findByQuery(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (id === 'forbidden') {
      throw new ForbiddenException('hoge');
    }
    if (id === 'internalservererror') {
      throw new InternalServerErrorException('fuga');
    }
    return this.carsService.remove(id);
  }
}
