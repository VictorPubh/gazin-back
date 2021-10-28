import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Request,
  UseGuards
} from '@nestjs/common';

import { PersonService } from './person/person.service';
import { CompanyService } from './company/company.service';
import { AuthService } from './auth/auth.service';

import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { Person as PersonModel } from '@prisma/client';
import { Company as CompanyModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly personService: PersonService,
    private readonly companyService: CompanyService
  ) {}

  // Authentication
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // User Profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // Companies
  @Get('company/:id')
  async getCompanyById(@Param('id') id: number): Promise<CompanyModel> {
    return this.companyService.company({
      id: Number(id)
    });
  }

  @Get('company')
  async getComponies(): Promise<CompanyModel[]> {
    return this.companyService.companies({})
  }

  @Post('company')
  async createCompany(
    @Body() postData: {
      name: string;
    }
  ): Promise<CompanyModel> {
    const { name } = postData;

    return this.companyService.createCompany({
      name,
    })
  }

  @UseGuards(JwtAuthGuard)
  @Put('company/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body() postData: {
      name: string;
    }
  ): Promise<CompanyModel> {
    const { name } = postData;

    return this.companyService.updateCompany({
      data: {
        name,
      },
      where: { id: Number(id) }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('company/:id')
  async deleteCompany(@Param('id') id: string): Promise<CompanyModel> {
    return this.companyService.deleteCompany({ id: Number(id) });
  }

  // Developers
  @Get('developers/:id')
  async getPersonById(@Param('id') id: number): Promise<PersonModel> {
    return this.personService.person({
      id: Number(id)
    });
  }

  @Get('developers')
  async getPeoples(): Promise<PersonModel[]> {
    return this.personService.peoples({
      where: { profession: 'Developer' }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Post('developers')
  async createPerson(
    @Body() postData: {
      name?: string;
      email: string;
      password: string;
      sex: string;
      company?: number;
      birthday: string;
    }
  ): Promise<PersonModel> {
    const {
      name,
      email,
      password,
      sex,
      company,
      birthday
    } = postData;

    return this.personService.createPerson({
      name,
      email,
      password,
      sex,
      birthday,
      profession: 'Developer',
      company: {
        connect: { id: company }
      }
    })
  }

  @UseGuards(JwtAuthGuard)
  @Put('developers/:id')
  async updatePerson(
    @Param('id') id: string,
    @Body() postData: {
      password: string;
      name?: string;
      sex?: string;
      birthday?: string;
      company?: number;
      profession?: string;
    }
  ): Promise<PersonModel> {
    const {
      name,
      sex,
      password,
      birthday,
      company,
      profession
    } = postData;

    return this.personService.updatePerson({
      data: {
        name,
        sex,
        birthday,
        password,
        profession,
        company: {
          connect: { id: company }
        }
      },
      where: { id: Number(id) }
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('developers/:id')
  async deletePerson(@Param('id') id: string): Promise<PersonModel> {
    return this.personService.deletePerson({ id: Number(id) });
  }
}