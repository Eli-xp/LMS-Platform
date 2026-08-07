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
  @ApiOperation({ summary: 'verify OTP Code' })
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
    headers: {
      'set-cookies': {
        description: 'access_token & refresh_token',
      },
    },
  })
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
  
  @ApiOperation({ summary: 'Send OTP Code to Users phone number' })
  @ApiResponse({
  type: String,
    status: 201,
    example: { message: 'OTP send successfully' },
  })
  sendOtp(@Body() createOtp: CreateOtp) {
    return this.authService.sendOtp(createOtp);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'regenerate access token' })
  @ApiResponse({
    type: Object,
    status: 201,
    headers: {
      'set-cookies': {
        description: 'access_token',
      },
    },
    example: {
      message: 'new access_token generated',
    },
  })
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
