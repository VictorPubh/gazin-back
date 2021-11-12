import { Person, Prisma } from '.prisma/client';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';
import { AddNewPerson } from './dto/person.dto';
import {
  ResponseCreatedPerson,
  ResponsePerson,
} from './dto/reponse-person.dto';
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
  @ApiOperation({ summary: 'Recever lista de Pessoa Desenvolvedores' })
  @ApiResponse({
    status: 200,
    description: 'Pessoas Desenvolvedoras Recebido com sucesso!',
    type: ResponsePerson,
    isArray: true,
  })
  @ApiParam({ name: 'skip', type: 'number', required: false })
  @ApiParam({ name: 'take', type: 'number', required: false })
  async getDevelopers(
    @Param('cursor') cursor?: Prisma.PersonWhereUniqueInput,
    @Param('orderBy') orderBy?: Prisma.PersonOrderByWithRelationInput,
    @Param('skip') skip?: number,
    @Param('take') take?: number,
  ): Promise<Person[]> {
    return this.personService.getPeoples({
      where: { profession: 'Developer' },
      cursor,
      orderBy,
      skip,
      take,
    });
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Criar uma Pessoa Desenvolvedora' })
  @ApiResponse({
    status: 201,
    description: 'Pessoa Desenvolvedora criado com sucesso!',
    type: ResponseCreatedPerson,
  })
  @ApiResponse({
    status: 400,
    description: 'Argumentos inválidos!',
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
      company: company
        ? {
            connect: { id: +company },
          }
        : {
            connectOrCreate: {
              where: {
                id: 1,
              },
              create: { name: 'Gazin' },
            },
          },
      hobbies: {
        connectOrCreate: hobbies.map(({ id, name }) => {
          return {
            where: { id },
            create: { id, name },
          };
        }),
      },
    });
  }
}
