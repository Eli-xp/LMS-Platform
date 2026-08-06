import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerDto';
import { OtpVerify } from './dto/OtpVerify-Dto';
import { CreateOtp } from './dto/createOpt-Dto';
import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/verifyOtp')
  async otpVerify(
    @Body() otpVerify: OtpVerify,
    // passthrough let you send set cookie using res while returning another data
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, refreshToken, user } =
      await this.authService.otpVerify(otpVerify);
    // send as cookies
    res.cookie('refresh_token', refreshToken, { httpOnly: true,});
    res.cookie('access_token', token, { httpOnly: true });
    // return user
    return { user };
  }

  @Post('/sendOtp')
  sendOtp(@Body() createOtp: CreateOtp) {
    return this.authService.sendOtp(createOtp);
  }

  @Post('/refresh')
  refresh(@Req() req: Request) {
    return this.authService.refresh(req.cookies.refresh_token);
  }
}
