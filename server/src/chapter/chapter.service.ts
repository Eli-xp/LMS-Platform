import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from 'src/course/schema/courseSchema';
import { Model } from 'mongoose';
import { Chapter } from './schema/chapterSchema';

@Injectable()
export class ChapterService {
    constructor(
        @InjectModel(Course.name) private readonly CourseModel: Model<Course>,
        @InjectModel(Chapter.name) private readonly ChapterModel: Model<Chapter>
    ) {}

    async create(createChapterDto: CreateChapterDto) {
        // counting chapters in course model and adding 1 to it
        const chapterPosition = await this.ChapterModel.countDocuments({ courseId: createChapterDto.courseId }) + 1;
        return this.ChapterModel.create({ ...createChapterDto, position: chapterPosition });
    }

   


  
}
