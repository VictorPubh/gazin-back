import { PersonEntity } from 'src/person/entity/person.entity';

export class ResponseAuth {
  acess_token: string;
  user: PersonEntity;
}
