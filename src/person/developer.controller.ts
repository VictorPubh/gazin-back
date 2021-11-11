import { Person } from '.prisma/client';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';
import { AddNewPerson } from './dto/add-new-person.dto';
import { responseCreatedDeveloper } from './dto/reponse-created-developer.dto';
import { respondeDeveloper } from './dto/responde-developer.dto';
import { PersonService } from './person.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@ApiTags('Developer Person')
@Controller('developer')
export class DeveloperController extends PrismaService {
  constructor(private readonly personService: PersonService) {
    super();
  }

  @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Receber pessoas com profissão: Developer',
    type: respondeDeveloper,
    isArray: true,
  })
  async getDevelopers(): Promise<Person[]> {
    return this.personService.getPeoples({
      where: { profession: 'Developer' },
    });
  }

  @Public()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Pessoa Desenvolvedora criado com sucesso!',
    type: responseCreatedDeveloper,
  })
  async createDeveloper(@Body() addNewPerson: AddNewPerson): Promise<Person> {
    const { name, email, password, sex, company, birthday, hobbies } =
      addNewPerson;

    return this.personService.createPerson({
      name,
      email,
      password,
      sex,
      birthday,
      profession: 'Developer',
      company: {
        connect: { id: +company },
      },
      hobbies: {
        connectOrCreate: hobbies.map(({ id, name }) => {
          return {
            where: { id },
            create: { name },
          };
        }),
      },
    });
  }
}
