import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MediaService } from 'src/media/media.service';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [CourseService,MediaService],
})
export class CourseModule {}
