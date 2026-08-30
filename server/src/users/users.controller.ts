import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from 'src/course/schema/courseSchema';
import { Model } from 'mongoose';
import { MediaService } from 'src/media/media.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mediaService: MediaService,
    @InjectModel(Course.name) private readonly CourseModel: Model<Course>
  ) {}

  @Post('/createProfile')
  async completeProfile(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.completeProfile(updateUserDto)
  }
}
