import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginReqDto } from './dto/login-req.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupReqDto } from 'src/users/dto/signup-req.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Client account registration',
    description:
      'Registers a client account. Admin accounts are provisioned internally by the system and are not created through this endpoint.',
  })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  async register(@Body() req: SignupReqDto) {
    return await this.authService.register(req);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiBody({ type: LoginReqDto })
  async login(@Body() req: LoginReqDto) {
    return await this.authService.login(req);
  }
}
