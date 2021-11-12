import { OmitType } from '@nestjs/swagger';
import { HobbyEntity } from '../entity/hobby.entity';

export class AddNewHobby extends OmitType(HobbyEntity, ['id']) {
  category: number;
}

export class UpdateHobby extends OmitType(AddNewHobby, ['categoryId']) {}
