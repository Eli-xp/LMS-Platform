import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/courseSchema';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/userSchema';
import { MediaService } from 'src/media/media.service';
import { UpdateCourseDto } from './dto/update-course.dto';

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

  async findOne(id: string){
    const course = await this.CourseModel.findById(id);
    if(!course){
      throw new NotFoundException('course not found')
    }
    return course
  }

  async deleteOne(id: string){
    const course = await this.CourseModel.findByIdAndDelete(id);
    if(!course){
      throw new NotFoundException('course not found')
    }
  }


  async findOneAndUpdate(updateCourseDto: UpdateCourseDto, userId: string, id: string){
    const course = await this.CourseModel.findOneAndUpdate(
      {_id: id,userId: userId},
      updateCourseDto
    )
    if(!course){
      throw new NotFoundException('course not found')
    }
    return {course}
  }

}
