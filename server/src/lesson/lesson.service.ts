import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chapter } from 'src/chapter/schema/chapterSchema';
import { Lesson } from './schema/lessonSchema';

@Injectable()
export class LessonService {
    constructor(
        @InjectModel(Chapter.name) private readonly ChapterModel: Model<Chapter>,
        @InjectModel(Lesson.name) private readonly LessonModel: Model<Lesson>,
    ) {}

    async create(createLessonDto: CreateLessonDto) {
        
    }
  
}
