import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MediaService } from 'src/media/media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schema/courseSchema';
import { User, UserSchema } from 'src/users/schema/userSchema';
import { UsersService } from 'src/users/users.service';
import { Chapter, ChapterSchema } from 'src/chapter/schema/chapterSchema';
import { Lesson, LessonSchema } from 'src/lesson/schema/lessonSchema';
import { ChapterService } from 'src/chapter/chapter.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Chapter.name,
        schema: ChapterSchema
      },
      {
        name: Lesson.name,
        schema: LessonSchema
      }
    ]),
  ],
  controllers: [CourseController],
  providers: [
    CourseService,
    MediaService,
    UsersService,
    ChapterService
  ],
})
export class CourseModule {}
