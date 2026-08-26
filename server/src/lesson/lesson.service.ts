import { Injectable, NotFoundException } from '@nestjs/common';
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
        // counting lessons in chapter model and adding 1 to it
        const lessonPosition = await this.LessonModel.countDocuments({ chapterId: createLessonDto.chapterId }) + 1;
        const newLesson = await this.LessonModel.create({ ...createLessonDto, position: lessonPosition });
        // add lessons id to chapter lessons array
        await this.ChapterModel.findByIdAndUpdate(createLessonDto.chapterId, { $push: { lessons: newLesson._id } });
        return {newLesson};
    }


    async delete(chapterId: string, lessonId: string){
        const lesson = await this.LessonModel.findOne({_id: lessonId,chapterId: chapterId});
        if(!lesson){
            throw new NotFoundException('lesson not found')
        }
        await Promise.all([
            this.LessonModel.deleteOne({_id: lessonId,chapterId: chapterId}),
            this.ChapterModel.updateOne({_id: chapterId},{$pull:{lessons:lessonId}})
        ])
    }
  
}
