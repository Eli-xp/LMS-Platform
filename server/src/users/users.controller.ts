import {
  Controller,
  Post,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from 'src/course/schema/courseSchema';
import { Model } from 'mongoose';
import { CourseService } from 'src/course/course.service';
import { MediaService } from 'src/media/media.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mediaService: MediaService,
    @InjectModel(Course.name) private readonly CourseModel: Model<Course>
  ) {}

  @Post('/createProfile')
  createProfile(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('courses')
  async fineAll(@Query('page') page: number, @Query('limit') limit: number){
    const courses = await this.CourseModel.find({status: 'Published'}).select('title slug category smallDescription thumbnail price duration level').skip((page - 1) * limit).limit(limit).lean();
    const courseCount = await this.CourseModel.countDocuments();
    const pageCount = Math.ceil(courseCount / limit);
    const coursesWithThumbnail = await Promise.all(
      courses.map(async (course) => {
        const thumbnailUrl = await this.mediaService.createViewUrl(
          course.thumbnail,
        );

        return {
          ...course,
          thumbnail: thumbnailUrl
        };
      }),
    );
    return {
      courses: coursesWithThumbnail,
      pageCount,
    };
    

  }
}
