import { CatsModule } from './cats/cats.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: 'cats', method: RequestMethod.DELETE },
        { path: 'cats', method: RequestMethod.POST },
        { path: 'auth/profile', method: RequestMethod.GET },
      );
  }
}
