import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpVerify } from './dto/OtpVerify-Dto';
import { CreateOtp } from './dto/createOpt-Dto';
import type { Request, Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';


export interface JwtUser {
  userId: string;
}
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

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
  async refresh(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    const { token } = await this.authService.refresh(req.cookies.refresh_token);
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    return { message: 'new access_token generated' };
  }


  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({summary:' send current users info'})
  @ApiResponse({
    type: Object,
    status: 201,
    example: {
      user: {
        name: 'userName',
        email: 'user email',
        _id: 'userId',
        phone: 'user Phone number',
        refreshToken: 'user hashed refreshToken',
      },
    }})
  @Get('/me')
    async findMe(@Req() req: Request){
      const {userId} = req.user as JwtUser
      const user = await this.usersService.findById(userId)
      return user;
    }



    @Get('/test')
    async test(){
      return 'this is a test router'
    }
}
