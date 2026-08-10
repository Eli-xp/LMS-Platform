import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateUploadUrlDto } from 'src/media/DTO/create-upload-dto';
import { MediaService } from 'src/media/media.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService, private readonly mediaService: MediaService) {}

  @Post('/upload-url')
  async createUploadUrl(@Body() createUploadUrl: CreateUploadUrlDto) {
    return this.mediaService.createUploadUrl(createUploadUrl.originalName,createUploadUrl.contentType)
  }
}
