import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { PersonService } from 'src/person/person.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [
    PersonService,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60s'
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthService]
})
export class AuthModule {}
