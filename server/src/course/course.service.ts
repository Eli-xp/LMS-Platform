import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './schema/courseSchema';
import { Model, Types } from 'mongoose';
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

  async findAll(page:number,limit:number){
    const courses = await this.CourseModel.find().select('title smallDescription duration level status price thumbnail slug').skip((page - 1)* limit).limit(limit).lean();
    const courseCount = await this.CourseModel.countDocuments();
    const pageCount = Math.ceil(courseCount / limit);
    const coursesWithThumbnail = await Promise.all(
  courses.map(async (course) => {
    const thumbnailUrl = await this.mediaService.createViewUrl(course.thumbnail)

    return {
      ...course,
      thumbnail: thumbnailUrl,
    };
  }),
);
return {
  courses: coursesWithThumbnail,
  courseCount,
  pageCount
}

    
  }

  async findOne(id: string){
    const course = await this.CourseModel.findById(id).select('-chapters');
    if(!course){
      throw new NotFoundException('course not found')
    }
    const { viewUrl } = await this.mediaService.createViewUrl(course.thumbnail);
    course.thumbnail = viewUrl;
    return course;
  }


  async findOneStructure(id: string){
    return this.CourseModel.findById(id).select('chapters').populate({
      path: 'chapters',
      select: 'title position',
      options: {sort:{position:1}},
      populate:{
        path: 'lessons',
        select: 'title position',
        options:{sort:{position:1}}
      }
    }).lean();

  }




  async deleteOne(id: string, userId: string){
    const course = await this.CourseModel.findByIdAndDelete(id);
    if(!course){
      throw new NotFoundException('course not found')
    }
    await this.UserModel.findByIdAndUpdate(userId,{$pull:{courses: course._id}})
    return {message:'course deleted'}
  }


  async findOneAndUpdate(updateCourseDto: UpdateCourseDto, id: string, userCourseId: string){
    const course = await this.CourseModel.findOneAndUpdate(
      {_id: new Types.ObjectId(id), userId: new Types.ObjectId(userCourseId)},
      updateCourseDto,
      {
        returnDocument:'after',
        runValidators: true
      }
    )
    if(!course){
      throw new NotFoundException('course not found')
    }
    return {course}
  }

}
