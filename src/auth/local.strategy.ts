import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

import { Person, Prisma } from '@prisma/client';
import { SignIn } from './dto/signIn.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private moduleref: ModuleRef) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(request: Request, entrySignIn: SignIn): Promise<any> {
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleref.resolve(AuthService, contextId);

    const user = await this.authService.validateUser(entrySignIn);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
