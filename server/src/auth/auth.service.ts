import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
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
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // signing jwt token
    const token = this.jwtService.sign({
      sub: user.id,
    });
    return { user, token };
  }
}
