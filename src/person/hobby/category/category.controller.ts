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

@Controller('hobbies')
export class CategoryController extends CategoryService {
  constructor(private readonly hobbyServices: HobbyService) {
    super();
  }

  @Public()
  @Get('/')
  async getAllHobbies(
    @Param('skip') skip: number,
    @Param('take') take: number,
    @Param('cursor') cursor: Prisma.HobbiesCategoryWhereUniqueInput,
    @Param('where') where: Prisma.HobbiesCategoryWhereInput,
    @Param('orderBy') orderBy: Prisma.HobbiesCategoryOrderByWithRelationInput,
  ) {
    return this.hobbyServices.getHobbies({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  @Put('category/:id')
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

  @Post('/category')
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
  @Get('/category')
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

  @Delete('category/:id')
  async deleteHobbyById(@Param('id') id: string): Promise<HobbiesCategory> {
    return this.deleteCategory({ id: +id });
  }
}
