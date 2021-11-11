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
import { PersonEntity } from './entity/person.entity';
import { PersonService } from './person.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Controller('person')
@ApiTags('Person')
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
  @Get('/:id')
  async getPersonById(@Param('id') id: number): Promise<Person> {
    return this.personService.getPerson({
      id: +id,
    });
  }

  @Public()
  @Post('/')
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
      hobbies: [
        {
          id: number;
          name: string;
        },
      ];
    },
  ): Promise<Person> {
    const {
      name,
      email,
      password,
      sex,
      company,
      profession,
      birthday,
      hobbies,
    } = postData;

    /* 
        TODO: Relationship to receive more than one Hobby at a time.
    */

    // const hobbiesId = hobbies.map(({ id }) => {
    //   id;
    // });

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

  @Put('/|/:id')
  async updatePerson(
    @Param('id') id: string,
    @Body()
    postData: {
      id?: number;
      password: string;
      name?: string;
      email?: string;
      sex?: string;
      birthday?: string;
      company?: number;
      profession?: string;
      hobbies: [
        {
          id: number;
          name: string;
        },
      ];
    },
  ): Promise<Person> {
    const {
      id: postId,
      name,
      sex,
      email,
      password,
      birthday,
      company,
      profession,
      hobbies,
    } = postData;

    return this.personService.updatePerson({
      data: {
        name,
        sex,
        birthday,
        password,
        profession,
        company: company
          ? {
              connect: { id: company },
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
      where: id ? { id: +id } : { email },
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma Pessoa' })
  @ApiResponse({ status: 204, description: 'Pessoa removida com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Pessoa não foi encontrada',
  })
  async deletePerson(@Param('id', ParseIntPipe) id: number) {
    await this.personService.deletePerson({ id });
  }
}
