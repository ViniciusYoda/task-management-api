import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthResponseDto } from './auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<AuthResponseDto> {
    return this.authService.signIn(username, password);
  }
}
