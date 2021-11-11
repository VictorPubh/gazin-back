import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntity } from 'src/company/entity/company.entity';
import { HobbiesEntity } from './hobbies.entity';
import { IsEmail, IsNotEmpty, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PersonEntity {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  sex: string;

  company?: CompanyEntity;

  @IsDate()
  @Type(() => Date)
  birthday: string;

  @ApiProperty({
    isArray: true,
  })
  hobbies: HobbiesEntity[];
}
