import { IsNotEmpty, IsOptional, IsPositive, MinLength } from 'class-validator';

export class CreateCatDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  age: number;

  @IsOptional()
  breed?: string;
}
