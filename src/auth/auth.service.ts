import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Person, Prisma } from '@prisma/client';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class AuthService extends PersonService {
  constructor(private jwtService: JwtService) {
    super();
  }

  async validateUser(email: string, entryPass: string): Promise<any> {
    try {
      const user = await this.getPerson({ email }, true);
      const decryptPass: string = this.decrypt(user.password);

      if (decryptPass == entryPass) {
        const { password, ...result } = user;

        return result;
      }

      return { err: 'Senha incorreta.' };
    } catch (err) {
      return { err: 'E-mail não encontrado.', code: 404 };
    }
  }

  async login(email: string, entryPass: string) {
    try {
      const user = await this.validateUser(email, entryPass);

      const payload = {
        email: user.email,
        sub: user.id,
      };

      if (user.err) {
        return user;
      } else {
        return {
          acess_token: this.jwtService.sign(payload),
        };
      }
    } catch (error) {
      return { error: 'Você não foi autenticado.' };
    }
  }
}
