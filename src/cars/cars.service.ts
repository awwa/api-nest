import { Injectable, Logger } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { QueryCarDto } from './dto/query-car.dto';

@Injectable()
export class CarsService {
  private readonly logger = new Logger(CarsService.name);

  create(createCarDto: CreateCarDto) {
    this.logger.log(createCarDto.id?.toString());
    return 'This action adds a new car';
  }

  findByQuery(query: QueryCarDto): Array<Car> {
    this.logger.log(query.modelName);
    const source = [
      new Car('car_1', 3420000, 'マツダ3'),
      new Car('car_2', 2800000, 'カローラ'),
    ];
    const cars = source.filter((car) => car.modelName == query.modelName);
    return cars;
  }

  findOne(id: string) {
    return `This action returns a #${id} car`;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    this.logger.log(updateCarDto.id?.toString());
    return `This action updates a #${id} car`;
  }

  remove(id: string) {
    return `This action removes a #${id} car`;
  }
}
