import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginReqDto {
  @ApiProperty({ example: 'client1@techstars.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123!@#' })
  @IsString()
  @MinLength(6)
  password: string;
}
