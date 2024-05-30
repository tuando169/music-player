import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);
    if (user.password != password) {
      throw new BadRequestException('Invalid password');
    }
    return true;
  }

  async register(name: string, email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user) throw new BadRequestException('User already registered');
    return this.usersService.create({
      email: email,
      password: password,
      name: name,
      album_list: [],
    });
  }
}
