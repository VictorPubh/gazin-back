import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Public } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  @Public()
  @ApiExcludeEndpoint()
  @Get()
  async home() {
    return {
      message:
        'Consulte os endpoints disponíveis através do Swagger ou da Coleção do Postman.',
      swagger: 'http://localhost:3000/api',
      postmanCollection:
        'https://github.com/VictorPubh/gazin-back/blob/main/Gazin.postman_collection.json',
    };
  }
}
