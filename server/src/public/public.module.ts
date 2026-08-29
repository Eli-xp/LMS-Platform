import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { Course, CourseSchema } from 'src/course/schema/courseSchema';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaService } from 'src/media/media.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema,
      },
    ]),
  ],
  controllers: [PublicController],
  providers: [MediaService],
})
export class PublicModule {}
