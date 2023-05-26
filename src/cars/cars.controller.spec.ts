import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { ConfigService } from '@nestjs/config';
import { Car } from './entities/car.entity';
import { QueryCarDto } from './dto/query-car.dto';

describe('CarsController', () => {
  let carsController: CarsController;
  let carsService: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService, ConfigService],
    }).compile();

    carsService = module.get<CarsService>(CarsService);
    carsController = module.get<CarsController>(CarsController);
  });

  describe('xxx', () => {
    it('should be defined', () => {
      expect(carsController).toBeDefined();
    });
  });

  describe('findByQuery', () => {
    it('should return an array of cars', async () => {
      const result = [new Car('car_1', 3420000, 'マツダ3')];
      jest.spyOn(carsService, 'findByQuery').mockImplementation(() => result);

      const query = new QueryCarDto('マツダ3');
      expect(await carsController.findByQuery(query)).toBe(result);
    });
  });
});
