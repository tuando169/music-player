import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<boolean> {
    return this.authService.login(email, password);
  }

  @Post('/register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.authService.register(name, email, password);
  }
}
