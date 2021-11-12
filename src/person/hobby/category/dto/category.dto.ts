import { OmitType } from '@nestjs/swagger';
import { CategoryEntity } from '../entity/category.entity';

export class AddNewCategory extends OmitType(CategoryEntity, ['id']) {}

export class UpdateCategory extends OmitType(CategoryEntity, ['id']) {}
