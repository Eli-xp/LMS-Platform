import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/courseSchema';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/userSchema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private readonly CourseModel: Model<Course>,
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}


  async create(createCourseDto: CreateCourseDto) {
    const newCourse = new this.CourseModel(createCourseDto);
    await newCourse.save();
    return {newCourse};
  }
  
  async findAll(){
    return this.CourseModel.find()
  }

}
