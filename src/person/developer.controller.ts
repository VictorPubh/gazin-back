import { Person } from '.prisma/client';
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

@Controller('developer')
export class DeveloperController extends PrismaService {
  constructor(private readonly personService: PersonService) {
    super();
  }

  // Developers
  @Public()
  @Get('/')
  async getDevelopers(): Promise<Person[]> {
    return this.personService.getPeoples({
      where: { profession: 'Developer' },
    });
  }

  @Public()
  @Post('/')
  async createDeveloper(
    @Body()
    postData: {
      name?: string;
      email: string;
      password: string;
      sex: string;
      company?: number;
      birthday: string;
      hobbies: [
        {
          id: number;
          name: string;
        },
      ];
    },
  ): Promise<Person> {
    const { name, email, password, sex, company, birthday, hobbies } = postData;

    return this.personService.createPerson({
      name,
      email,
      password,
      sex,
      birthday,
      profession: 'Developer',
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
    });
  }
}
