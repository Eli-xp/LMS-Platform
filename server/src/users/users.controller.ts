import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Req,
  NotFoundException,
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
import type { Request } from 'express';
import { JwtUser } from 'src/auth/auth.controller';
import { User } from './schema/userSchema';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mediaService: MediaService,
    @InjectModel(Course.name) private readonly CourseModel: Model<Course>,
    @InjectModel(User.name) private readonly UserModel: Model<User>
  ) {}

  @Post('createProfile')
  async completeProfile(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.completeProfile(updateUserDto)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('suggestion')
  @ApiOperation({summary: 'return courses without pain ones'})
  async getUserSuggest(@Req() req: Request){
    const {userId} = req.user as JwtUser;
    const user = await this.UserModel.findById(userId).select('paidCourses').lean();
    if(!user){
      throw new NotFoundException('user not found')
    }
    const paidCoursesId = user.paidCourses;
    const courses = await this.CourseModel.find({
      status: 'Published',
      _id: {$nin: paidCoursesId}
    });
    return courses;
  }
}
