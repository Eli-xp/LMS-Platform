import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { MediaService } from 'src/media/media.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly mediaService: MediaService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    // getting thumbnail post url
    const { newLesson } = await this.lessonService.create(createLessonDto);
    const { url,fields,fileKey } = await this.mediaService.createUploadUrl(createLessonDto.thumbnailObject.originalname, createLessonDto.thumbnailObject.contentType);
    newLesson.thumbnailKey = fileKey;
    await newLesson.save();
    return { message: 'new lesson created', url, fields };
  }
  
}
