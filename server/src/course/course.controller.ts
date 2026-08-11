import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateUploadUrlDto } from 'src/media/DTO/create-upload-dto';
import { MediaService } from 'src/media/media.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { JwtUser } from 'src/auth/auth.controller';
import { Types } from 'mongoose';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService, private readonly mediaService: MediaService) {}

  @Post('/upload-url')
  @ApiOperation({ summary: 'create upload url' })
  @ApiResponse({ type: Object, status: 200, example:{
    uploadUrl: 'https://s3.amazonaws.com/BUCKET_NAME/Assets/uuid.jpg',
    fileKey: 'Assets/uuid.jpg'
  } })
  async createUploadUrl(@Body() createUploadUrl: CreateUploadUrlDto) {
    return this.mediaService.createUploadUrl(createUploadUrl.originalName,createUploadUrl.contentType)
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @Req() req: Request
  ) {
    const { newCourse } = await this.courseService.create(createCourseDto);
    const  {userId}  = req.user as JwtUser;
    newCourse.userId = new Types.ObjectId(userId);
    await newCourse.save();
    return {message: 'new course created', newCourse};
  }

  @Post('/upload-complete')
  async uploadComplete(@Body() fileKey: string){

  }
}
