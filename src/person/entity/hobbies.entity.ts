import { IsNumber, IsString } from 'class-validator';

export class HobbiesEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
