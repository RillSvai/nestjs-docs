import { DynamicModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RequestService } from 'src/services/request.service';

const jwtModule: DynamicModule = JwtModule.registerAsync({
  useFactory: (configService: ConfigService) => ({
    global: true,
    secret: configService.getOrThrow('SECRET'),
    signOptions: { expiresIn: configService.getOrThrow('EXPIRE_DURATION') },
  }),
  inject: [ConfigService],
});
@Module({
  imports: [UsersModule, jwtModule],
  controllers: [AuthController],
  providers: [AuthService, RequestService],
  exports: [jwtModule, RequestService],
})
export class AuthModule {}
