import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import {
  Person,
  Prisma
} from '@prisma/client';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class AuthService {
  constructor(
    private personService: PersonService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: Prisma.PersonWhereUniqueInput, entrypass: string): Promise<any> {
    const user = await this.personService.person(email);
    const { password } = user;

    const decryptPass: string = this.personService.decrypt(password);
    const userEncrypt: string = this.personService.encrypt(entrypass);
    if (user && userEncrypt === decryptPass) {
      const { password, ...result } = user;
      return result;
    }
    

    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id
    };

    return {
      acess_token: this.jwtService.sign(payload),
    }
  }
}