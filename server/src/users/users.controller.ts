import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/createProfile')
  createProfile(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
