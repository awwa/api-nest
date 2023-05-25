import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

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

  it('findAll() should return a string', () => {
    expect(service.findAll()).toEqual('This action returns all cars');
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
