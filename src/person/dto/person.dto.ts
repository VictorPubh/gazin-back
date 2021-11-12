import { OmitType } from '@nestjs/swagger';
import { PersonEntity } from '../entity/person.entity';

export class AddNewPerson extends PersonEntity {}

export class UpdatePerson extends OmitType(PersonEntity, [
  'email',
  'password',
  'birthday',
]) {}
