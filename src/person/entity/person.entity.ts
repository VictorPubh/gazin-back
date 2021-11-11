import { ApiProperty } from '@nestjs/swagger';
import { CompanyEntity } from 'src/company/entity/company.entity';
import { HobbiesEntity } from './hobbies.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class PersonEntity {
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
  sex: string;

  @ApiProperty({
    type: CompanyEntity,
  })
  company?: {
    id: number;
    name: string;
  };
  birthday: string;

  @ApiProperty({
    type: HobbiesEntity,
    isArray: true,
  })
  hobbies: [
    {
      id: number;
      name: string;
    },
  ];
}
