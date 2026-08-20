import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from 'src/course/schema/courseSchema';
import { Model } from 'mongoose';

@Injectable()
export class ChapterService {
    constructor(
        @InjectModel(Course.name) private readonly CourseModel: Model<Course>
    ) {}

   


  
}
