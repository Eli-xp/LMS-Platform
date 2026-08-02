import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    return 'This action adds a new auth';
  }

  login(loginDto: LoginDto) {
    return ``;
  }
}
