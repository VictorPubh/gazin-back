import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PersonEntity } from '../entity/person.entity';

export class AddNewPerson extends OmitType(PersonEntity, ['company']) {
  @ApiProperty({
    description: 'Company Identifier',
    required: true,
    type: 'number',
  })
  company: number;
}

export class UpdatePerson extends OmitType(PersonEntity, [
  'email',
  'password',
  'birthday',
]) {}
