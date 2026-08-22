import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from 'src/chapter/schema/chapterSchema';
import { Lesson, LessonSchema } from './schema/lessonSchema';
import { MediaService } from 'src/media/media.service';
import { Course, CourseSchema } from 'src/course/schema/courseSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chapter.name,
        schema: ChapterSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Lesson.name,
        schema: LessonSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
    ]),
  ],
  controllers: [LessonController],
  providers: [LessonService, MediaService]
})
export class LessonModule {}
