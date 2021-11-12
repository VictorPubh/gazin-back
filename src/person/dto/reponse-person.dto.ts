import { PersonEntity } from '../entity/person.entity';

export class ResponsePerson extends PersonEntity {
  createdAt: string;
  age: number;
  companyId: number;
}

export class ResponseCreatedPerson extends ResponsePerson {}
