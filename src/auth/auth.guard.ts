import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import { Request } from 'express';
import { RequestService } from 'src/services/request.service';

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly requestService: RequestService) {}
  canActivate(context: ExecutionContext): boolean {
    this.logger.log(
      `===Auth Guard for ${this.requestService?.User?.username ?? 'None'}===`,
    );
    const request: Request = context.switchToHttp().getRequest();
    this.logger.log(request.url);
    return true;
  }
}
