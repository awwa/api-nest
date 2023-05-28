import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Car } from '../entities/car.entity';

export class CarDto {
  fromEntity(car: Car): CarDto {
    const dto = new CarDto();
    dto.id = car.id;
    dto.price = car.price;
    dto.modelName = car.modelName;
    return dto;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  modelName: string;
}
