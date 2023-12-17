import { BadRequestException, PipeTransform } from '@nestjs/common';

export class PositiveNumberPipe
  implements PipeTransform<number, Promise<number>>
{
  async transform(value: number): Promise<number> {
    if (value <= 0) {
      throw new BadRequestException('Id is invalid');
    }
    return value;
  }
}
