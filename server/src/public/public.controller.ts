import { Controller, Get, Query,UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { Course } from 'src/course/schema/courseSchema';
import { MediaService } from 'src/media/media.service';

@Controller('public')
export class PublicController {
  constructor(
    @InjectModel(Course.name) private readonly CourseModel: Model<Course>,
    private readonly mediaService: MediaService
  ) {}

  @UseGuards(AuthGuard('jwt'))
    @Get('courses')
    @ApiOperation({summary: 'return courses with Published status only'})
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
