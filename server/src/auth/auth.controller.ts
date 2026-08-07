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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/verifyOtp')
  @ApiResponse({
    type: Object,
    status: 201,
    example: {
      user: {
        name: 'userName',
        _id: 'userId',
        phone: 'user Phone number',
        refreshToken: 'user hashed refreshToken',
      },
    },
  })
  @ApiOperation({ summary: 'verify OTP Code' })
  async otpVerify(
    @Body() otpVerify: OtpVerify,
    // passthrough let you send set cookie using res while returning another data
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, refreshToken, user } =
      await this.authService.otpVerify(otpVerify);
    // send as cookies
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    // return user
    return user;
  }

  @Post('/sendOtp')
  @ApiResponse({ type: String, status: 201, example: 'OTP send successfully' })
  @ApiOperation({ summary: 'Send OTP Code to Users phone number' })
  sendOtp(@Body() createOtp: CreateOtp) {
    return this.authService.sendOtp(createOtp);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'regenerate access token' })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { token } = await this.authService.refresh(req.cookies.refresh_token);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { message: 'new access_token generated' };
  }
}
