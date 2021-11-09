import { Controller, Get } from '@nestjs/common';

import { PersonService } from './person/person.service';
import { CompanyService } from './company/company.service';
import { AuthService } from './auth/auth.service';

import { Public } from './auth/jwt-auth.guard';

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
}
