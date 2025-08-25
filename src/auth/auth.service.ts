import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginReqDto } from './dto/login-req.dto';
import { SanitizedUser } from 'src/common/types/sanitized-user.type';
import { JwtPayload } from 'src/common/types/jwt-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(req: LoginReqDto): Promise<SanitizedUser> {
    const { email, password } = req;
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await user.comparePassword(password))) {
      const { passwordHash: _, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(req: LoginReqDto) {
    const user = await this.validateUser(req);

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const { passwordHash: _, ...result } = user;
    return result;
  }
}
