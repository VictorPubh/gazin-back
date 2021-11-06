import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Person, Prisma } from '@prisma/client';
import { PersonService } from 'src/person/person.service';

@Injectable()
export class AuthService extends PersonService {
  constructor(private jwtService: JwtService) {
    super();
  }

  bearerDecode(token: string) {
    return token ? token.replace('Bearer ', '') : false;
  }

  async validateToken(token: string) {
    try {
      const userToken = await this.jwtService.verify(token);
      const { email }: Prisma.PersonWhereUniqueInput = userToken;
      if (email) {
        const user = await this.getPerson({ email });
        return user ? user : false;
      }
      return false;
    } catch (err) {
      return { ...err };
    }
  }

  async validateUser(email: string, entryPass: string): Promise<any> {
    try {
      const user = await this.getPerson({ email }, true);
      const decryptPass: string = this.decrypt(user.password);

      if (decryptPass == entryPass) {
        const { password, ...result } = user;

        return result;
      }

      // Incorrect password
      return { err: 'Senha incorreta.', code: 401 };
    } catch (err) {
      // E-mail not found
      return { err: 'E-mail não encontrado', code: 404 };
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
          user,
        };
      }
    } catch (err) {
      // Not authenticated
      return { err: 'Não autenticado.', code: 400 };
    }
  }
}
