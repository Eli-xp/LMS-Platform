import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chapter } from 'src/chapter/schema/chapterSchema';
import { Lesson } from './schema/lessonSchema';
import { DeleteLessonDto } from './dto/deleteLessonDto';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class LessonService {
    constructor(
        @InjectModel(Chapter.name) private readonly ChapterModel: Model<Chapter>,
        @InjectModel(Lesson.name) private readonly LessonModel: Model<Lesson>,
        private readonly mediaService: MediaService
    ) {}

    async create(createLessonDto: CreateLessonDto) {
        // counting lessons in chapter model and adding 1 to it
        const lessonPosition = await this.LessonModel.countDocuments({ chapterId: createLessonDto.chapterId }) + 1;
        const newLesson = await this.LessonModel.create({ ...createLessonDto, position: lessonPosition });
        // add lessons id to chapter lessons array
        await this.ChapterModel.findByIdAndUpdate(createLessonDto.chapterId, { $push: { lessons: newLesson._id } });
        return {newLesson};
    }


    async delete(deleteLessonDto: DeleteLessonDto){
        const lesson = await this.LessonModel.findOne({_id: deleteLessonDto.lessonId,chapterId: deleteLessonDto.chapterId});
        if(!lesson){
            throw new NotFoundException('lesson not found')
        }
        await Promise.all([
            this.mediaService.deleteUrl(lesson.videoKey),
            this.mediaService.deleteUrl(lesson.thumbnailKey),
            this.LessonModel.deleteOne({_id: deleteLessonDto.lessonId,chapterId: deleteLessonDto.chapterId}),
            this.ChapterModel.updateOne({_id: deleteLessonDto.chapterId},{$pull:{lessons:deleteLessonDto.lessonId}})
        ])
    }


    async findOne(id: string){
        const lesson = await this.LessonModel.findById(id).select('-__v -createdAt -updatedAt').lean();
        if(!lesson){
            throw new NotFoundException('lesson not found')
        }
        return {lesson};
    }


    async updateOne(id: string, updateLessonDto: UpdateLessonDto){
        const lesson = await this.LessonModel.findOneAndUpdate(
            {_id:id,chapterId:updateLessonDto.chapterId},
            updateLessonDto,
        );
        return {lesson}
    }
  
}
