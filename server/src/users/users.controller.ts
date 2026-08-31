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
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}

  @Post('createProfile')
  async completeProfile(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.completeProfile(updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('suggestion')
  @ApiOperation({ summary: 'return courses without pain ones' })
  async getUserSuggest(@Req() req: Request) {
    // * get usersId from cookie
    const { userId } = req.user as JwtUser;
    // * find user
    const user = await this.UserModel.findById(userId).lean();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // ! if paidCourses is empty don't return null instead return []
    const paidCoursesId = user?.paidCourses ?? [];
    // * find courses last 3 courses that not include in users paid courses
    const courses = await this.CourseModel.find({
      status: 'Published',
      _id: { $nin: paidCoursesId },
    })
      .limit(3)
      .sort({ createdAt: -1 })
      .select(
        'title slug category smallDescription thumbnail price duration level',
      )
      .lean();
    const coursesWithThumbnail = await Promise.all(
      courses.map(async (course) => {
        const thumbnailUrl = await this.mediaService.createViewUrl(
          course.thumbnail,
        );

        return {
          ...course,
          thumbnail: thumbnailUrl,
        };
      }),
    );
    return {
      courses: coursesWithThumbnail
    }
  }
}
