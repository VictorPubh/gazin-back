import { IsNumber, IsString, IsArray } from 'class-validator';

export class NotFoundPerson {
  @IsNumber({})
  statusCode: number;

  @IsString()
  message: string;

  @IsString()
  error: string;
}

export class BadRequestPerson {
  @IsNumber({})
  statusCode: number;

  @IsArray()
  message: string[];

  @IsString()
  error: string;
}
