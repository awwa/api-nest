import { ApiProperty } from '@nestjs/swagger';

export class QueryCarDto {
  /**
   * クルマのモデル名
   * @example 'マツダ3'
   */
  @ApiProperty()
  modelName?: string;

  constructor(modelName: string) {
    this.modelName = modelName;
  }
}
