import { ApiProperty } from '@nestjs/swagger';

export class Car {
  @ApiProperty()
  id: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  modelName: string;

  constructor(id: string, price: number, modelName: string) {
    this.id = id;
    this.price = price;
    this.modelName = modelName;
  }
}
