import {
  Injectable,
  NestInterceptor,
  Scope,
  Logger,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RequestService } from 'src/services/request.service';
import { tap } from 'rxjs';
@Injectable({ scope: Scope.REQUEST })
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(private readonly requestService: RequestService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest();
    const userAgent = req.get('user-agent') || '';
    const { ip, method } = req;

    this.logger.log(
      `${method} ${userAgent} ${ip}: ${context.getClass().name} ${
        context.getHandler().name
      }`,
    );

    this.logger.debug('Sub:', this.requestService.User?.sub ?? '-1');
    const before = Date.now();
    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const contentLength = response.get('content-length');

        this.logger.log(
          `${method} ${statusCode} ${contentLength} - ${userAgent} ${ip}: ${
            Date.now() - before
          }ms`,
        );
      }),
    );
  }
}
