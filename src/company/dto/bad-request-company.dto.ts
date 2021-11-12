import { IsNumber, IsString, IsArray } from 'class-validator';

export class BadRequestCompany {
  @IsNumber()
  statusCode: number;

  @IsArray()
  message: string[];

  @IsString()
  error: string;
}

export class NotFoundCompany {
  @IsNumber()
  statusCode: number;

  @IsString()
  message: string;

  @IsString()
  error: string;
}
