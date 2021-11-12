import { IsNumber, IsString, IsArray } from 'class-validator';

export class NotFoundCategory {
  @IsNumber({})
  statusCode: number;

  @IsArray()
  message: string;

  @IsString()
  error: string;
}

export class BadRequestCategory {
  @IsNumber({})
  statusCode: number;

  @IsArray()
  message: string[];

  @IsString()
  error: string;
}
