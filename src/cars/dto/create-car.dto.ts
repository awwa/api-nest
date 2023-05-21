import { IsString, IsInt } from 'class-validator';

export class CreateCarDto {
  @IsString()
  id: string;

  @IsInt()
  price: number;

  @IsString()
  modelName: string;
}
