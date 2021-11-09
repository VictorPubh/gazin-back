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

@Public()
@Controller()
export class HobbyController extends HobbyService {
  @Get('/hobby')
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

  @Post('/hobby')
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
  @Get('hobby/:id')
  async getById(@Param('id') id: number): Promise<Hobby> {
    return this.getHobby({
      id: +id,
    });
  }

  @Put('hobby/:id')
  async updateHobbyName(
    @Param('id') id: string,
    @Body()
    postData: {
      name: string;
    },
  ): Promise<Hobby> {
    const { name } = postData;

    return this.updateHobby({
      data: {
        name,
      },
      where: { id: +id },
    });
  }

  @Delete('hobby/:id')
  async deleteHobbyById(@Param('id') id: string): Promise<Hobby> {
    return this.deleteHobby({ id: +id });
  }
}
