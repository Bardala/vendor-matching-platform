import { SanitizedUser } from 'src/common/types/sanitized-user.type';
import { LoginReqDto } from '../dto/login-req.dto';
import { SignupReqDto } from 'src/users/dto/signup-req.dto';

export interface IAuthService {
  validateUser(req: LoginReqDto): Promise<SanitizedUser>;
  login(req: LoginReqDto): Promise<{ token: string }>;
  register(req: SignupReqDto): Promise<{ token: string }>;
}
