import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from 'src/course/schema/courseSchema';


@Module({
  imports:[
    MongooseModule.forFeature([
          {
            name: Course.name,
            schema: CourseSchema,
          }
        ]),
  ],
  controllers: [],
  providers: [MediaService],
})
export class MediaModule {}
