import { IsString } from 'class-validator';

export class ValidateToken {
  @IsString()
  jwt: string;
}
