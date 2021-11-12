import { IsString, IsNumber } from 'class-validator';

export class HobbyEntity {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsNumber()
  categoryId: number;
}
