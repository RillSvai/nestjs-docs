import {
  Injectable,
  Logger,
  NestMiddleware,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { config } from 'dotenv';
import { Request, Response } from 'express';
import { PayloadDto } from 'src/auth/dto/payload.dto';
import { RequestService } from 'src/services/request.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly requestService: RequestService,
  ) {}
  async use(
    req: Request,
    res: Response,
    next: (error?: any) => void,
  ): Promise<void> {
    this.logger.log('===Start Authentication===');
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException(
        'Structure authentication`s header is invalid',
      );
    }

    try {
      config();
      const configService: ConfigService = new ConfigService();
      const payload = await this.jwtService.verifyAsync(token, {
        secret: configService.getOrThrow('SECRET'),
      });
      this.requestService.User = new PayloadDto(
        payload.sub,
        payload.username,
        payload.exp,
      );
    } catch {
      throw new UnauthorizedException('Token is invalid or expire date pass');
    }
    this.logger.log('===End Authentication===');
    next();
  }

  private extractToken(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
