import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
