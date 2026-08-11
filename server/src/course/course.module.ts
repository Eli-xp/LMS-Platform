import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MediaService } from 'src/media/media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schema/courseSchema';
import { User, UserSchema } from 'src/users/schema/userSchema';

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
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, MediaService],
})
export class CourseModule {}
