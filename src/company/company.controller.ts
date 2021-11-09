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
import { Public } from 'src/auth/jwt-auth.guard';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController extends CompanyService {
  @Public()
  @Get('/')
  async getComponies(): Promise<Company[]> {
    return this.getCompanies({});
  }

  // Companies
  @Public()
  @Get('/:id')
  async getCompanyById(@Param('id') id: number): Promise<Company> {
    return this.getCompany({
      id: +id,
    });
  }

  @Public()
  @Post('/')
  async addNewCompany(@Body() postData: { name: string }): Promise<Company> {
    const { name } = postData;

    return this.createCompany({
      name,
    });
  }

  @Put('/:id')
  async updadateCompanyName(
    @Param('id') id: string,
    @Body()
    postData: {
      name: string;
    },
  ): Promise<Company> {
    const { name } = postData;

    return this.updateCompany({
      data: {
        name,
      },
      where: { id: +id },
    });
  }

  @Delete('/:id')
  async deleteCompanyById(@Param('id') id: string): Promise<Company> {
    return this.deleteCompany({ id: +id });
  }
}
