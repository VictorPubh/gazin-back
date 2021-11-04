import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';

import { PersonService } from './person/person.service';
import { CompanyService } from './company/company.service';
import { AuthService } from './auth/auth.service';

import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard, Public } from './auth/jwt-auth.guard';

import { Person as PersonModel } from '@prisma/client';
import { Company as CompanyModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly personService: PersonService,
    private readonly companyService: CompanyService,
  ) {}

  @Public()
  @Get('/')
  async home() {
    return {
      message: 'Consulte os endpoints disponíveis através da Coleção do Postman.',
      collection: 'https://github.com/VictorPubh/gazin-back/blob/main/Gazin.postman_collection.json',
    };
  }

  // Authentication
  @Public()
  @Post('auth/login')
  async login(
    @Request() req,
    @Body()
    postData: {
      email: string;
      password: string;
    },
  ) {
    const { email, password } = postData;
    return this.authService.login(email, password);
  }

  // User Profile
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // Companies
  @Public()
  @Get('company/:id')
  async getCompanyById(@Param('id') id: number): Promise<CompanyModel> {
    return this.companyService.getCompany({
      id: Number(id),
    });
  }

  @Public()
  @Get('company')
  async getComponies(): Promise<CompanyModel[]> {
    return this.companyService.getCompanies({});
  }

  @Post('company')
  async createCompany(
    @Body() postData: { name: string },
  ): Promise<CompanyModel> {
    const { name } = postData;

    return this.companyService.createCompany({
      name,
    });
  }

  @Put('company/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body()
    postData: {
      name: string;
    },
  ): Promise<CompanyModel> {
    const { name } = postData;

    return this.companyService.updateCompany({
      data: {
        name,
      },
      where: { id: Number(id) },
    });
  }

  @Delete('company/:id')
  async deleteCompany(@Param('id') id: string): Promise<CompanyModel> {
    return this.companyService.deleteCompany({ id: Number(id) });
  }

  // Developers
  @Public()
  @Get('developers')
  async getDevelopers(): Promise<PersonModel[]> {
    return this.personService.getPeoples({
      where: { profession: 'Developer' },
    });
  }

  @Public()
  @Post('developer')
  async createDeveloper(
    @Body()
    postData: {
      name?: string;
      email: string;
      password: string;
      sex: string;
      company?: number;
      birthday: string;
    },
  ): Promise<PersonModel> {
    const { name, email, password, sex, company, birthday } = postData;

    return this.personService.createPerson({
      name,
      email,
      password,
      sex,
      birthday,
      profession: 'Developer',
      company: {
        connect: { id: company },
      },
    });
  }

  // Peoples
  @Public()
  @Get('peoples')
  async getPeoples(): Promise<PersonModel[]> {
    return this.personService.getPeoples({});
  }

  @Public()
  @Get('person/:id')
  async getPersonById(@Param('id') id: number): Promise<PersonModel> {
    return this.personService.getPerson({
      id: Number(id),
    });
  }

  @Public()
  @Post('person')
  async createPerson(
    @Body()
    postData: {
      name?: string;
      email: string;
      password: string;
      sex: string;
      company?: number;
      profession: string;
      birthday: string;
    },
  ): Promise<PersonModel> {
    const { name, email, password, sex, company, profession, birthday } =
      postData;

    return this.personService.createPerson({
      name,
      email,
      password,
      sex,
      birthday,
      profession,
      company: {
        connect: { id: company },
      },
    });
  }

  @Put('person/:id')
  async updatePerson(
    @Param('id') id: string,
    @Body()
    postData: {
      password: string;
      name?: string;
      sex?: string;
      birthday?: string;
      company?: number;
      profession?: string;
    },
  ): Promise<PersonModel> {
    const { name, sex, password, birthday, company, profession } = postData;

    return this.personService.updatePerson({
      data: {
        name,
        sex,
        birthday,
        password,
        profession,
        company: {
          connect: { id: company },
        },
      },
      where: { id: Number(id) },
    });
  }

  @Delete('person/:id')
  async deletePerson(@Param('id') id: string): Promise<PersonModel> {
    return this.personService.deletePerson({ id: Number(id) });
  }
}
