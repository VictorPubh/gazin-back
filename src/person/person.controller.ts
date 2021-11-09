import { Person, Prisma } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma.service';
import { PersonService } from './person.service';

const moment = require('moment');

@Controller('person')
export class PersonController extends PrismaService {
  constructor(private readonly personService: PersonService) {
    super();
  }

  // Peoples
  @Public()
  @Get('/')
  async getPeoples(
    @Param('skip') skip: number,
    @Param('take') take: number,
    @Param('cursor') cursor: Prisma.PersonWhereUniqueInput,
    @Param('where') where: Prisma.PersonWhereInput,
    @Param('orderBy') orderBy: Prisma.PersonOrderByWithRelationInput,
  ): Promise<Person[]> {
    return this.personService.getPeoples({
      skip,
      take,
      cursor,
      where,
      orderBy,
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

  @Put('/:id')
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
      hobbies: [
        {
          id: number;
          name: string;
        },
      ];
    },
  ): Promise<Person> {
    const { name, sex, password, birthday, company, profession, hobbies } =
      postData;

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
        hobbies: {
          connectOrCreate: hobbies.map(({ id, name }) => {
            return {
              where: { id },
              create: { name },
            };
          }),
        },
      },
      where: { id: +id },
    });
  }

  @Delete('/:id')
  async deletePerson(@Param('id') id: string): Promise<Person> {
    return this.personService.deletePerson({ id: +id });
  }
}
