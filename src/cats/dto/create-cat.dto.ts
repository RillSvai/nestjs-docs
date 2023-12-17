import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  MinLength,
  IsString,
} from 'class-validator';

export class CreateCatDto {
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsPositive()
  @IsNotEmpty()
  age: number;

  @IsOptional()
  @IsString()
  breed?: string;
}
