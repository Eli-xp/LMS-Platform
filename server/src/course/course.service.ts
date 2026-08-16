import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/courseSchema';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/userSchema';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private readonly CourseModel: Model<Course>,
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    private readonly mediaService: MediaService
  ) {}


  async create(createCourseDto: CreateCourseDto) {
    const newCourse = new this.CourseModel(createCourseDto);
    await newCourse.save();
    return {newCourse};
  }

  async findAll(){
    const courses = await this.CourseModel.find().select('title smallDescription duration level status price thumbnail slug');
    return Promise.all(
  courses.map(async (course) => {
    const thumbnailUrl = await this.mediaService.createViewUrl(course.thumbnail)

    return {
      ...course.toObject(),
      thumbnail: thumbnailUrl,
    };
  }),
);
    
  }

}
