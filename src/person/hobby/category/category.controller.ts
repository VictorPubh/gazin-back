import { HobbiesCategory, Prisma } from '.prisma/client';
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
import { HobbyService } from '../hobby.service';
import { CategoryService } from './category.service';

@Controller('category|categories|hobbies-category')
export class CategoryController extends CategoryService {
  constructor(private readonly hobbyServices: HobbyService) {
    super();
  }

  @Put('/:id')
  async updateCategoryById(
    @Param('id') id: string,
    @Body()
    postData: {
      name: string;
    },
  ): Promise<HobbiesCategory> {
    const { name } = postData;

    return this.updateCategory({
      data: {
        name,
      },
      where: { id: +id },
    });
  }

  @Post('/')
  async addCategory(
    @Body()
    postData: {
      name: string;
    },
  ): Promise<HobbiesCategory> {
    const { name } = postData;

    return this.createCategory({
      name,
    });
  }

  @Public()
  @Get('/')
  async getAllCategories(
    @Param('skip') skip: number,
    @Param('take') take: number,
    @Param('cursor') cursor: Prisma.HobbiesCategoryWhereUniqueInput,
    @Param('where') where: Prisma.HobbiesCategoryWhereInput,
    @Param('orderBy') orderBy: Prisma.HobbiesCategoryOrderByWithRelationInput,
  ): Promise<HobbiesCategory[]> {
    return this.getCategories({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  @Delete('/:id')
  async deleteHobbyById(@Param('id') id: string): Promise<HobbiesCategory> {
    return this.deleteCategory({ id: +id });
  }
}
