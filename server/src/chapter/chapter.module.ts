import { Module } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/course/schema/courseSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
          {
            name: Course.name,
            schema: CourseSchema,
          },
        ]),
  ],
  controllers: [ChapterController],
  providers: [ChapterService],
})
export class ChapterModule {}
