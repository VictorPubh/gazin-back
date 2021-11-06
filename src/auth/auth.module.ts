import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PersonService } from 'src/person/person.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { PrismaClient } from '.prisma/client';

@Module({
  imports: [
    PrismaClient,
    PersonService,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '86400s',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, PersonService],
  exports: [AuthService],
})
export class AuthModule {}
