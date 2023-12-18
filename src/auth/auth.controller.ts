import { Body, Controller, HttpCode, HttpStatus, Scope } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { Post, Get } from '@nestjs/common';
import { RequestService } from 'src/services/request.service';
import { PayloadDto } from './dto/payload.dto';

@Controller({
  path: 'auth',
  scope: Scope.REQUEST,
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly requestService: RequestService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return await this.authService.signIn(signInDto);
  }

  @Get('profile')
  getProfile(): PayloadDto {
    return this.requestService.User;
  }
}
