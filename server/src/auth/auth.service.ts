import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
  ) {}
  async register(registerDto: RegisterDto) {
    // finding user by userService method
    const user = await this.userService.findByEmail(registerDto.email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return await this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    const user =  await this.userService.findByEmail(loginDto.email);
    if(!user){
      throw new NotFoundException('User not found')
    }
    return user;
  }
}
