import { OmitType } from '@nestjs/swagger';
import { CompanyEntity } from '../entity/company.entity';

export class AddNewCompany extends OmitType(CompanyEntity, ['id']) {}

export class UpdateCompany extends OmitType(CompanyEntity, ['id']) {}
