import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntity } from 'src/company/entity/company.entity';
import { IsEmail, IsNotEmpty, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { HobbyEntity } from '../hobby/entity/hobby.entity';

export class PersonEntity {
  id?: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
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
  hobbies: HobbyEntity[];
}
