import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupReqDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123!@#' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Meta' })
  @IsString()
  @MinLength(1)
  companyName: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  contactEmail: string;
}
