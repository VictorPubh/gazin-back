import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Prisma } from '@prisma/client';
import { PersonService } from 'src/person/person.service';
import { SignIn } from './dto/signIn.dto';

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
      if (userToken) {
        const user = await this.getPerson({ email });
        return user ? user : false;
      }
      return false;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async validateUser(entrySignIn: SignIn): Promise<any> {
    try {
      const user = await this.getPerson({ email: entrySignIn.email }, true);
      const decryptPass: string = this.decrypt(user.password);

      if (decryptPass == entrySignIn.password) {
        const { password, ...result } = user;

        return result;
      }

      throw new UnauthorizedException();
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async login(signIn: SignIn) {
    try {
      const result = await this.validateUser(signIn);

      const payload = {
        email: result.email,
        sub: result.id,
      };

      if (result.err) {
        return result;
      } else {
        return {
          acess_token: this.jwtService.sign(payload),
          user: result,
        };
      }
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
