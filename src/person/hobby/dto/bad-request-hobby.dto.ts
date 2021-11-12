import { IsNumber, IsString, IsArray } from 'class-validator';

export class BadRequestHobby {
  @IsNumber({})
  statusCode: number;

  @IsArray()
  message: string[];

  @IsString()
  error: string;
}

export class NotFoundHobby {
  @IsNumber({})
  statusCode: number;

  @IsString()
  message: string;

  @IsString()
  error: string;
}
