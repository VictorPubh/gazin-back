import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn } from './dto/signIn.dto';
import { Public } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  // Authentication
  @Public()
  @Post('/login')
  async login(@Body() signIn: SignIn, @Res() res) {
    const dataUser = await this.service.login(signIn);

    if (dataUser.err) {
      const { err, code } = dataUser;
      return res.status(code).json({ err });
    }

    return res.status(200).json(dataUser);
  }

  @Public()
  @Post('/validate-token')
  async validateToken(@Res() res, @Request() req) {
    const { jwt: bodyJwt } = req.body;
    const headerJwt = this.service.bearerDecode(req.headers.authorization);

    const validation = await this.service.validateToken(bodyJwt || headerJwt);

    if ((!bodyJwt && !headerJwt) || !validation) {
      return res.status(400).json({
        err: 'Você precisa definir um Token JWT via Body (with { "jwt": "..."}) ou Header (with "Bearer ...").',
      });
    }

    if (validation.expiredAt) {
      return res.status(410).json(validation);
    }

    return res.status(200).json(validation);
  }

  // Get User Profile
  @Get('/validate-token')
  getProfile(@Request() req) {
    return this.service.getPerson({ id: +req.user.userId });
  }
}
