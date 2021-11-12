import { Person, Prisma } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';
import { AddNewPerson } from './dto/person.dto';
import { BadRequestPerson, NotFoundPerson } from './dto/bad-request-person.dto';
import { UpdatePerson } from './dto/person.dto';
import {
  ResponseCreatedPerson,
  ResponsePerson,
} from './dto/reponse-person.dto';
import { PersonEntity } from './entity/person.entity';
import { PersonService } from './person.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@ApiTags('Peoples')
@Controller('person')
export class PersonController extends PrismaService {
  constructor(private readonly personService: PersonService) {
    super();
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Receber lista de pessoas' })
  @ApiResponse({
    status: 200,
    description: 'Pessoas Recebido com sucesso!',
    type: PersonEntity,
    isArray: true,
  })
  @ApiParam({ name: 'skip', type: 'number', required: false })
  @ApiParam({ name: 'take', type: 'number', required: false })
  async getPeoples(
    @Param('where') where?: Prisma.PersonWhereInput,
    @Param('cursor') cursor?: Prisma.PersonWhereUniqueInput,
    @Param('orderBy') orderBy?: Prisma.PersonOrderByWithRelationInput,
    @Param('skip') skip?: number,
    @Param('take') take?: number,
  ): Promise<Person[]> {
    return this.personService.getPeoples({
      where,
      cursor,
      orderBy,
      skip,
      take,
    });
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Receber Pessoa por ID' })
  @ApiResponse({
    status: 200,
    description: 'Receber Objeto de Pessoa',
    type: ResponsePerson,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma Pessoa encontrado',
    type: BadRequestPerson,
  })
  async getPersonById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Person | any> {
    return this.personService.getPerson({
      id,
    });
  }

  @Public()
  @Post('/')
  @ApiOperation({ summary: 'Criar uma Pessoa' })
  @ApiResponse({
    status: 201,
    description: 'Pessoa Criado com sucesso!',
    type: ResponseCreatedPerson,
  })
  @ApiResponse({
    status: 400,
    description: 'Argumentos inválidos!',
  })
  async createPerson(@Body() addNewPerson: AddNewPerson): Promise<Person> {
    const {
      name,
      email,
      password,
      sex,
      company,
      profession,
      birthday,
      hobbies,
    } = addNewPerson;

    return this.personService.createPerson({
      name,
      email,
      password,
      sex,
      birthday: moment(birthday).format(),
      profession,
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

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar Pessoa' })
  @ApiResponse({
    status: 200,
    description: 'Pessoa Atualizado com sucesso!',
    type: ResponsePerson,
  })
  @ApiResponse({
    status: 400,
    description: 'Argumentos inválidos!',
    type: BadRequestPerson,
  })
  @ApiResponse({
    status: 404,
    description: 'Pessoa não encontrado.',
    type: NotFoundPerson,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  async updatePerson(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updatePerson: UpdatePerson,
  ): Promise<Person> {
    const {
      id: postId,
      name,
      sex,
      password,
      birthday,
      company,
      profession,
      hobbies,
    } = updatePerson;

    return this.personService.updatePerson({
      data: {
        name,
        sex,
        birthday,
        password,
        profession,
        company: company
          ? {
              connect: { id: +company },
            }
          : undefined,
        hobbies: {
          connectOrCreate: hobbies.map(({ id, name }) => {
            return {
              where: { id: +id || +postId },
              create: { name },
            };
          }),
        },
      },
      where: { id: +id },
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma Pessoa' })
  @ApiResponse({ status: 204, description: 'Pessoa removida com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Pessoa não foi encontrada',
    type: NotFoundPerson,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  async deletePerson(@Param('id', ParseIntPipe) id: number) {
    await this.personService.deletePerson({ id });
  }
}
