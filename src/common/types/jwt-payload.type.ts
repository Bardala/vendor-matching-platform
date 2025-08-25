import { UserRole } from 'src/users/entities/user.entity';

export interface JwtPayload {
  email: string;
  sub: number;
  role: UserRole;
}
