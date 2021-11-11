import { Company } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/jwt-auth.guard';
import { CompanyService } from './company.service';
import { AddNewCompany, UpdateCompany } from './dto/company.dto';

@ApiTags('Companies')
@Controller('company')
export class CompanyController extends CompanyService {
  @Public()
  @Get()
  async getComponies(): Promise<Company[]> {
    return this.getCompanies({});
  }

  @Public()
  @Post()
  async addNewCompany(@Body() addNewCompany: AddNewCompany): Promise<Company> {
    return this.createCompany({
      ...addNewCompany,
    });
  }

  @Public()
  @Get('/:id')
  async getCompanyById(@Param('id') id: number): Promise<Company> {
    return this.getCompany({
      id: +id,
    });
  }

  @Put('/:id')
  async updadateCompanyName(
    @Param('id') id: string,
    @Body() updateCompany: UpdateCompany,
  ): Promise<Company> {
    return this.updateCompany({
      data: {
        ...updateCompany,
      },
      where: { id: +id },
    });
  }

  @Delete('/:id')
  async deleteCompanyById(@Param('id') id: string): Promise<Company> {
    return this.deleteCompany({ id: +id });
  }
}
