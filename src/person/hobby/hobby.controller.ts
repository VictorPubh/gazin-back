import { Hobby, Prisma } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/jwt-auth.guard';
import { NotFoundPerson } from '../dto/bad-request-person.dto';
import { HobbiesEntity } from '../entity/hobbies.entity';
import { AddNewHobby, UpdateHobby } from './dto/hobby.dto';
import { BadRequestHobby, NotFoundHobby } from './dto/bad-request-hobby.dto';
import { ResponseCreatedHobby } from './dto/response-hobby.dto';
import { HobbyService } from './hobby.service';
import { HobbyEntity } from './entity/hobby.entity';

@ApiTags('Hobbies')
@Controller('hobby')
export class HobbyController extends HobbyService {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Receber lista de Hobbies' })
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
    type: HobbiesEntity,
    isArray: true,
  })
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

  @Post()
  @ApiOperation({ summary: 'Criar novo Hobby' })
  @ApiResponse({
    status: 201,
    description: 'Criado com sucesso!',
    type: ResponseCreatedHobby,
  })
  @ApiResponse({
    status: 400,
    description: 'Argumentos inválidos!',
    type: BadRequestHobby,
  })
  async addHobby(@Body() addNewHobby: AddNewHobby): Promise<Hobby> {
    const { name, category } = addNewHobby;

    return this.createHobby({
      name,
      category: {
        connect: { id: category },
      },
    });
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Receber Hobby por ID' })
  @ApiResponse({
    status: 200,
    description: 'Receber Objeto de Pessoa',
    type: HobbyEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhuma Pessoa encontrado',
    type: BadRequestHobby,
  })
  async getById(@Param('id') id: number): Promise<Hobby> {
    return this.getHobby({
      id: +id,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar Hobby por ID' })
  @ApiResponse({
    status: 200,
    description: 'Pessoa Atualizado com sucesso!',
    type: ResponseCreatedHobby,
  })
  @ApiResponse({
    status: 400,
    description: 'Argumentos inválidos!',
    type: BadRequestHobby,
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
  async updateHobbyName(
    @Param('id') id: string,
    @Body() updateHobby: UpdateHobby,
  ): Promise<Hobby> {
    const { name, category } = updateHobby;

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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um Hobby por ID' })
  @ApiResponse({ status: 204, description: 'Hobby removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Hobby não foi encontrada',
    type: NotFoundHobby,
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
  })
  async deleteHobbyById(@Param('id') id: string): Promise<void> {
    await this.deleteHobby({ id: +id });
  }
}
