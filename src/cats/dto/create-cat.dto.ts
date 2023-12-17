import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  MinLength,
  IsString,
  IsInt,
} from 'class-validator';

export class CreateCatDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsPositive()
  age: number;

  @IsOptional()
  @IsString()
  breed?: string;
}
