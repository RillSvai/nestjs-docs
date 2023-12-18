import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user: User = await this.usersService.findOne(signInDto.username);
    if (user.password !== signInDto.password) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: user.id, username: user.username };
    const token = {
      access_token: await this.jwtService.signAsync(payload),
    };
    return token;
  }
}
