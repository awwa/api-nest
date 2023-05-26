import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Car } from './../src/cars/entities/car.entity';
import { CarsModule } from './../src/cars/cars.module';
import { CarsService } from './../src/cars/cars.service';

describe('Cars (e2e)', () => {
  let app: INestApplication;
  const carsService = {
    findByQuery: (/*query: QueryCarDto*/) => [
      new Car('car_1', 3400000, 'マツダ3'),
    ],
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CarsModule],
    })
      .overrideProvider(CarsService)
      .useValue(carsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/cars (GET)', () => {
    return request(app.getHttpServer())
      .get(encodeURI('/cars?modelName=マツダ3'))
      .expect(200)
      .expect([{ id: 'car_1', price: 3400000, modelName: 'マツダ3' }]);
  });

  afterEach(async () => {
    await app.close();
  });
});
