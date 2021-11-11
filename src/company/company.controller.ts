import { Company } from '.prisma/client';
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/jwt-auth.guard';
import { CompanyService } from './company.service';
import {
  BadRequestCompany,
  NotFoundCompany,
} from './dto/bad-request-company.dto';
import { AddNewCompany, UpdateCompany } from './dto/company.dto';
import { ResponseCompany } from './dto/response-company.dto';
import { CompanyEntity } from './entity/company.entity';

@ApiTags('Companies')
@Controller('company')
export class CompanyController extends CompanyService {
  @Public()
  @Get()
  @ApiOperation({ summary: 'Receber lista de Empresas' })
  @ApiResponse({
    status: 200,
    description: 'Empresas Recebido com sucesso!',
    type: CompanyEntity,
    isArray: true,
  })
  async getComponies(): Promise<Company[]> {
    return this.getCompanies({});
  }

  @Public()
  @Post()
  @ApiOperation({ summary: 'Adicionar nova Empresa' })
  @ApiResponse({
    status: 201,
    description: 'Adicionado com sucesso!',
    type: ResponseCompany,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Argumentos inválidos',
    type: BadRequestCompany,
  })
  async addNewCompany(@Body() addNewCompany: AddNewCompany): Promise<Company> {
    return this.createCompany({
      ...addNewCompany,
    });
  }

  @Public()
  @ApiOperation({ summary: 'Receber Objeto Empresa por ID' })
  @ApiResponse({
    status: 200,
    description: 'Empresa encontrada com sucesso!',
    type: ResponseCompany,
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa não encontrada!',
    type: NotFoundCompany,
  })
  @Get('/:id')
  async getCompanyById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Company> {
    return this.getCompany({
      id,
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar Empresa por ID' })
  @ApiResponse({
    status: 200,
    description: 'Atualizado com sucesso!',
    type: ResponseCompany,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Argumentos inválidos',
    type: BadRequestCompany,
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa não encontrada!',
    type: NotFoundCompany,
  })
  async updadateCompanyName(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompany: UpdateCompany,
  ): Promise<Company> {
    return this.updateCompany({
      data: {
        ...updateCompany,
      },
      where: { id },
    });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar Empresa por ID' })
  @ApiResponse({
    status: 204,
    description: 'Deletado com sucesso!',
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa não encontrada.',
    type: NotFoundCompany,
  })
  async deleteCompanyById(@Param('id', ParseIntPipe) id: number) {
    await this.deleteCompany({ id: id });
  }
}
