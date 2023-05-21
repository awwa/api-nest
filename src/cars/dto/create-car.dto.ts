// import { ApiProperty } from '@nestjs/swagger';
// import { IsString, IsInt } from 'class-validator';

export class CreateCarDto {
  /**
   * クルマのID
   * @example 'car_1'
   */
  id: string;

  /**
   * クルマの価格
   * @example 3400000
   */
  price: number;

  /**
   * クルマのモデル名
   * @example 'マツダ3'
   */
  modelName: string;
}
