import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateOtp } from './dto/createOpt-Dto';
import { OtpVerify } from './dto/OtpVerify-Dto';
import { randomInt } from 'crypto';
import { RedisService } from 'src/redis/redis.service';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly smsService: SmsService,
  ) {}
  async otpVerify(otpVerify: OtpVerify) {
    const storedCode = await this.redisService.get(otpVerify.phone);
    if (!storedCode) {
      throw new UnauthorizedException('OTP expired');
    }
    if (storedCode !== otpVerify.code) {
      throw new UnauthorizedException('Invalid OTP');
    }
    await this.redisService.del(otpVerify.phone);
    // check if user exists
    const existedUser = await this.userService.findByPhone(otpVerify.phone);
    if(existedUser){
      throw new ConflictException('user already exists')
    }
    await this.userService.create({phone: otpVerify.phone})
    // signing jwt token
    const token = this.jwtService.sign({
      sub: otpVerify.phone,
    });
    return { message: 'user logged in successfully', token };
  }

  async sendOtp(createOtp: CreateOtp) {
    const code = randomInt(100000, 1000000).toString();
    await this.redisService.set(createOtp.phone, code, 120);
    await this.smsService.sendOpt(createOtp.phone, code);
    return 'OTP send successfully';
  }
}
