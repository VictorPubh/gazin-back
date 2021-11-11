import { IsNumber, IsString } from 'class-validator';

export class BadRequestPerson {
  @IsNumber({})
  statusCode: number;

  @IsString()
  message: string;

  @IsString()
  error: string;
}
