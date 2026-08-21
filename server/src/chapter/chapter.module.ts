import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/course/schema/courseSchema';
import { Chapter, ChapterSchema } from './schema/chapterSchema';

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
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
