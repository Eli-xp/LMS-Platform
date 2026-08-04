import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { OtpVerify } from './dto/OtpVerify-Dto';
import { CreateOtp } from './dto/createOpt-Dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/verifyOtp')
  otpVerify(@Body() otpVerify: OtpVerify) {
    return this.authService.otpVerify(otpVerify);
  }

  @Post('/sendOtp')
  sendOtp(@Body() createOtp: CreateOtp) {}
}
