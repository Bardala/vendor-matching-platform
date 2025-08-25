import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginReqDto } from './dto/login-req.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiBody({ type: LoginReqDto })
  login(@Body() req: LoginReqDto) {
    return this.authService.login(req);
  }
}
