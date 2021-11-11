import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
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
