import { PersonEntity } from '../entity/person.entity';

export class responseCreatedDeveloper extends PersonEntity {
  createdAt: string;
  age: number;
  companyId: number;
}
