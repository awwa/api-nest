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
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { QueryCarDto } from './dto/query-car.dto';
import { ValidationPipe } from '../validation.pipe';
import { ConfigService } from '@nestjs/config';
import { Car } from './entities/car.entity';
import {
  ApiExtraModels,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
// import { PaginatedDto } from 'src/openapi/paginated-dto';
import { CarDto } from './dto/car.dto';
import { ApiPaginatedResponse } from 'src/openapi/api-pagenated-response';

@ApiHeader({
  name: 'X-MyHeader',
  description: 'Custom header',
})
@ApiTags('cars')
@Controller('cars')
// @ApiExtraModels(PaginatedDto)
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
  @ApiNotFoundResponse({
    description: '指定したidのデータが見つからなかった。',
  })
  @ApiOkResponse({ description: '指定したidのデータが見つかった。', type: Car })
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

  @Get('pagenated')
  // @ApiPaginatedResponse(CarDto)
  async findPagenatedByQuery(
    @Query(new ValidationPipe()) query: QueryCarDto,
  ): /*Promise<PaginatedDto<CarDto>>*/ Promise<CarDto> {
    const cars = await this.carsService.findByQuery(query);
    // const resp = new PaginatedDto<CarDto>();
    // resp.results = cars.map((car) => new CarDto().fromEntity(car));
    // return resp;
    const dtos = cars.map((car) => new CarDto().fromEntity(car));
    return dtos[0];
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
