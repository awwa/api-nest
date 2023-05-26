export class QueryCarDto {
  /**
   * クルマのモデル名
   * @example 'マツダ3'
   */
  modelName?: string;

  constructor(modelName: string) {
    this.modelName = modelName;
  }
}
