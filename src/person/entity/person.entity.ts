import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntity } from 'src/company/entity/company.entity';
import { HobbiesEntity } from './hobbies.entity';
import {
  IsEmail,
  IsNotEmpty,
  isNumber,
  IsDate,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PersonEntity {
  id?: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  sex: string;

  @IsString()
  profession: string;

  company?: CompanyEntity;

  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @ApiProperty({
    isArray: true,
  })
  hobbies: HobbiesEntity[];
}
