import { Injectable, Scope } from '@nestjs/common';
import { PayloadDto } from 'src/auth/dto/payload.dto';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private user: PayloadDto;

  get User(): PayloadDto {
    return this.user;
  }
  set User(payloadDto: PayloadDto) {
    this.user = payloadDto;
  }
}
