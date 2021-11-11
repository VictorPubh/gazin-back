import { PersonEntity } from '../entity/person.entity';

export class responseCreatedPerson extends PersonEntity {
  createdAt: string;
  age: number;
  companyId: number;
}
