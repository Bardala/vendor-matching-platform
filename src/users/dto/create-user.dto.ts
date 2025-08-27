import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from 'src/users/entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  passwordHash: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  clientId: number;
}
