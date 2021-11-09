import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Request,
  Res,
} from '@nestjs/common';

import { PersonService } from './person/person.service';
import { CompanyService } from './company/company.service';
import { AuthService } from './auth/auth.service';

import { Public } from './auth/jwt-auth.guard';

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
      message:
        'Consulte os endpoints disponíveis através da Coleção do Postman.',
      collection:
        'https://github.com/VictorPubh/gazin-back/blob/main/Gazin.postman_collection.json',
    };
  }

  // Authentication
  @Public()
  @Post('auth/login')
  async login(@Request() req, @Res() res) {
    const { email, password } = req.body;
    const dataUser = await this.authService.login(email, password);

    if (dataUser.err) {
      const { err, code } = dataUser;
      return res.status(code).json({ err });
    }

    return res.status(200).json(dataUser);
  }

  @Public()
  @Post('auth/validate-token')
  async validateToken(@Res() res, @Request() req) {
    const bodyJwt = req.body.jwt;
    const headerJwt = this.authService.bearerDecode(req.headers.authorization);

    const validation = await this.authService.validateToken(
      bodyJwt || headerJwt,
    );

    if ((!bodyJwt && !headerJwt) || !validation) {
      res.status(400).json({
        err: 'Você precisa definir um Token JWT via Body ou Header (Bearer).',
      });
    }

    if (validation.expiredAt) {
      res.status(410).json(validation);
    }

    res.status(200).json(validation);
  }

  // Get User Profile
  @Get('auth/validate-token')
  getProfile(@Request() req) {
    return this.personService.getPerson({ id: +req.user.userId });
  }

  // Companies
  @Public()
  @Get('company/:id')
  async getCompanyById(@Param('id') id: number): Promise<CompanyModel> {
    return this.companyService.getCompany({
      id: +id,
    });
  }

  @Public()
  @Get('company')
  async getComponies(): Promise<CompanyModel[]> {
    return this.companyService.getCompanies({});
  }

  @Public()
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
      where: { id: +id },
    });
  }

  @Delete('company/:id')
  async deleteCompany(@Param('id') id: string): Promise<CompanyModel> {
    return this.companyService.deleteCompany({ id: +id });
  }
}
