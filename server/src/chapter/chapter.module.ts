import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/course/schema/courseSchema';
import { Chapter, ChapterSchema } from './schema/chapterSchema';
import { Lesson, LessonSchema } from 'src/lesson/schema/lessonSchema';
import { MediaService } from 'src/media/media.service';

@Module({
  imports: [
    MongooseModule.forFeature([
          {
            name: Course.name,
            schema: CourseSchema,
          },
        ]),
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
            ])
  ],
  controllers: [ChapterController],
  providers: [ChapterService, MediaService],
})
export class ChapterModule {}
