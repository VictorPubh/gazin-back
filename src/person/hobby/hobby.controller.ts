import { Hobby, Prisma } from '.prisma/client';
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
import { HobbyService } from './hobby.service';

@Controller('hobby|hobbies')
export class HobbyController extends HobbyService {
  @Public()
  @Get('/')
  async getAll(
    @Param('skip') skip: number,
    @Param('take') take: number,
    @Param('cursor') cursor: Prisma.HobbyWhereUniqueInput,
    @Param('where') where: Prisma.HobbyWhereInput,
    @Param('orderBy') orderBy: Prisma.HobbyOrderByWithRelationInput,
  ) {
    return this.getHobbies({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  @Post('/')
  async addHobby(
    @Body()
    postData: {
      name: string;
      category?: number;
    },
  ): Promise<Hobby> {
    const { name, category } = postData;

    return this.createHobby({
      name,
      category: {
        connect: { id: category },
      },
    });
  }

  @Public()
  @Get('/:id')
  async getById(@Param('id') id: number): Promise<Hobby> {
    return this.getHobby({
      id: +id,
    });
  }

  @Put('/:id')
  async updateHobbyName(
    @Param('id') id: string,
    @Body()
    postData: {
      name: string;
      category?: number;
    },
  ): Promise<Hobby> {
    const { name, category } = postData;

    return this.updateHobby({
      data: {
        name,
        category: {
          connect: { id: category },
        },
      },
      where: { id: +id },
    });
  }

  @Delete('/:id')
  async deleteHobbyById(@Param('id') id: string): Promise<Hobby> {
    return this.deleteHobby({ id: +id });
  }
}
