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
import bcrypt from 'node_modules/bcryptjs';
import config from 'config';

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
    const existedUser = await this.userService.findByPhone(otpVerify.phone);
    let user = existedUser;
    if (!user) {
      user = await this.userService.create({ phone: otpVerify.phone });
    }
    // signing jwt token
    const token = this.jwtService.sign({ sub: user._id }, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(
      { sub: user._id },
      {
        secret: config.get<string>('server.jwt.REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );
    // hashing refresh token
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    // saving refresh token in db
    await this.userService.updateRefreshToken(user.id, refreshTokenHash);
    return { token, refreshToken };
  }

  async sendOtp(createOtp: CreateOtp) {
    const code = randomInt(100000, 1000000).toString();
    await this.redisService.set(createOtp.phone, code, 360);
    await this.smsService.sendOpt(createOtp.phone, code);
    return {message: 'OTP send successfully'};
  }

  async refresh(refreshToken: string) {
    try {
      // verifying refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: config.get<string>('server.jwt.REFRESH_SECRET'),
      });
      // finding user by id
      const user = await this.userService.findById(payload.id);
      // check if token valid
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      // checking hashed token
      const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      // signing new access token
      const token = this.jwtService.sign(
        { sub: user._id },
        { expiresIn: '15m' },
      );
      return { token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
