import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginReqDto } from './dto/login-req.dto';
import { SanitizedUser } from 'src/common/types/sanitized-user.type';
import { JwtPayload } from 'src/common/types/jwt-payload.type';
import { IAuthService } from './interfaces/i-auth-service.interface';
import { ClientsService } from 'src/clients/clients.service';
import { DataSource } from 'typeorm';
import { SignupReqDto } from 'src/users/dto/signup-req.dto';
import { UserRole } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
    private readonly clientsService: ClientsService,
    private readonly jwtService: JwtService,
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

    const token = this.jwtService.sign(payload);

    return {
      token,
    };
  }

  async register(req: SignupReqDto): Promise<{ token: string }> {
    return this.dataSource.transaction(async manager => {
      const client = await this.clientsService.create(
        { companyName: req.companyName, contactEmail: req.email },
        manager,
      );

      const user = await this.usersService.create(
        {
          email: req.email,
          passwordHash: req.password,
          role: UserRole.CLIENT,
          clientId: client.id,
        },
        manager,
      );

      const payload = { sub: user.id, role: user.role };
      return { token: this.jwtService.sign(payload) };
    });
  }
}
