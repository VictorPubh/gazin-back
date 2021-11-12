import { IsString, IsNumber } from 'class-validator';

export class CategoryEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
