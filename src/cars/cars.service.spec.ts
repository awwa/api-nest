import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { Car } from './entities/car.entity';
import { QueryCarDto } from './dto/query-car.dto';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create() should return a string', () => {
    const dto = new CreateCarDto();
    expect(service.create(dto)).toEqual('This action adds a new car');
  });

  it('findByQuery) should return car list', () => {
    const expected = [new Car('car_1', 3420000, 'マツダ3')];
    const query = new QueryCarDto('マツダ3');
    expect(service.findByQuery(query)).toEqual(expected);
  });

  it('findOne() should return a string', () => {
    expect(service.findOne('car_1')).toEqual(
      'This action returns a #car_1 car',
    );
  });

  it('update() should return a string', () => {
    expect(service.update('car_1', new CreateCarDto())).toEqual(
      'This action updates a #car_1 car',
    );
  });

  it('remove() should return a string', () => {
    expect(service.remove('car_1')).toEqual('This action removes a #car_1 car');
  });
});
