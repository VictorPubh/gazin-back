import { IsNumber, IsString } from 'class-validator';

export class CompanyEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
