import { HobbiesCategory, Prisma } from '.prisma/client';
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
import { HobbyService } from '../hobby.service';
import { CategoryService } from './category.service';
import {
  BadRequestCategory,
  NotFoundCategory,
} from './dto/bad-request-category.dto';
import { AddNewCategory, UpdateCategory } from './dto/category.dto';
import { ResponseCreatedCategory } from './dto/response-category.dto';
import { CategoryEntity } from './entity/category.entity';

@ApiTags('Hobbies Category')
@Controller('hobbies-category')
export class CategoryController extends CategoryService {
  constructor(private readonly hobbyServices: HobbyService) {
    super();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar Category por ID' })
  @ApiResponse({
    status: 200,
    description: 'Pessoa Atualizado com sucesso!',
    type: ResponseCreatedCategory,
  })
  @ApiResponse({
    status: 400,
    description: 'Argumentos inválidos!',
    type: BadRequestCategory,
  })
  @ApiResponse({
    status: 404,
    description: 'Pessoa não encontrado.',
    type: NotFoundCategory,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  async updateCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategory: UpdateCategory,
  ): Promise<HobbiesCategory> {
    const { name } = updateCategory;

    return this.updateCategory({
      data: {
        name,
      },
      where: { id },
    });
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova Category' })
  @ApiResponse({
    status: 201,
    description: 'Criado com sucesso!',
    type: ResponseCreatedCategory,
  })
  @ApiResponse({
    status: 400,
    description: 'Argumentos inválidos!',
    type: BadRequestCategory,
  })
  async addCategory(
    @Body() addNewCategory: AddNewCategory,
  ): Promise<HobbiesCategory> {
    const { name } = addNewCategory;

    return this.createCategory({
      name,
    });
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Receber lista de Categories' })
  @ApiParam({
    name: 'skip',
    required: false,
  })
  @ApiParam({
    name: 'take',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Recebido com sucesso!',
    type: CategoryEntity,
    isArray: true,
  })
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um Category por ID' })
  @ApiResponse({ status: 204, description: 'Hobby removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Hobby não foi encontrada',
    type: NotFoundCategory,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  async deleteHobbyById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteCategory({ id });
  }
}
