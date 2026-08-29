import { Controller, Get, NotFoundException, Param, Query,UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { options } from 'axios';
import { Model } from 'mongoose';
import { Course } from 'src/course/schema/courseSchema';
import { MediaService } from 'src/media/media.service';

@Controller('public')
export class PublicController {
  constructor(
    @InjectModel(Course.name) private readonly CourseModel: Model<Course>,
    private readonly mediaService: MediaService
  ) {}

    @Get('courses')
    @ApiOperation({summary: 'return courses with Published status only'})
    async fineAll(@Query('page') page: number, @Query('limit') limit: number){
      const courses = await this.CourseModel.find({status: 'Published'}).select('title slug category smallDescription thumbnail price duration level').sort({createdAt: -1}).skip((page - 1) * limit).limit(limit).lean();
      const courseCount = await this.CourseModel.countDocuments({status: 'Published'});
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

    @SkipThrottle()
    @Get('course/:slug')
    @ApiOperation({summary: 'return one course '})
    async findOne(@Param('slug') slug: string){
        const course = await this.CourseModel.findOne({slug: slug, status: 'Published'}).select('title category smallDescription thumbnail price duration level chapters').populate({
          path: 'chapters',
          select: 'title courseId lessons',
          options: {sort:{position:1}},
          populate:{
            path:'lessons',
            select:'title chapterId',
            options:{sort:{position:1}}
          }
        }).lean();
      if(!course){
        throw new NotFoundException('course not found')
      }
      const { viewUrl } = await this.mediaService.createViewUrl(course.thumbnail);
      course.thumbnail = viewUrl;
      return course;
    }
}
