import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  BadRequestPerson,
  NotFoundPerson,
} from 'src/person/dto/bad-request-person.dto';
import { AuthService } from './auth.service';
import { ResponseAuth } from './dto/auth.dto';
import { ExpiredJwt } from './dto/response-auth.dto';
import { SignIn } from './dto/signIn.dto';
import { ValidateToken } from './dto/validate-token.dto';
import { Public } from './jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Autenticação de Usuário' })
  @ApiResponse({
    status: 200,
    description: 'Autenticado com sucesso!',
    type: ResponseAuth,
  })
  @Post('/login')
  async login(@Body() signIn: SignIn) {
    return await this.service.login(signIn);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/validate-token')
  @ApiOperation({ summary: 'Validar JWT de Usuário via Body' })
  @ApiResponse({
    status: 410,
    description: 'JWT Expirado (Inválido).',
    type: ExpiredJwt,
  })
  @ApiResponse({
    status: 400,
    description: 'JWT Não informado.',
    type: BadRequestPerson,
  })
  @ApiResponse({
    status: 200,
    description: 'JWT Validado..',
    type: ResponseAuth,
  })
  async validateToken(@Body() validateToken: ValidateToken) {
    return await this.service.validateToken(validateToken.jwt);
  }

  @Get('/validate-token')
  @ApiOperation({
    summary: 'Validar JWT de Usuário via Headers & Recebe Person',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
    type: NotFoundPerson,
  })
  @ApiResponse({
    status: 400,
    description: 'Falha na conclusão da Request.',
    type: BadRequestPerson,
  })
  @ApiResponse({
    status: 200,
    description: 'Pessoa recebida com sucesso!',
    type: ResponseAuth,
  })
  getProfile(@Request() req) {
    return this.service.getPerson({ id: +req.user.userId });
  }
}
