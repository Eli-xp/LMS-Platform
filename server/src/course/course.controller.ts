import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateUploadUrlDto } from 'src/media/DTO/create-upload-dto';
import { MediaService } from 'src/media/media.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Express } from 'express';
import { JwtUser } from 'src/auth/auth.controller';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express'
import { ConfirmUploadDto } from 'src/media/DTO/confirmUploadDto';


@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly mediaService: MediaService,
  ) {}

  @Post('/upload-url')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'create upload url' })
  @ApiResponse({
    type: Object,
    status: 200,
    example: {
      uploadUrl: 'https://s3.amazonaws.com/BUCKET_NAME/Assets/uuid.jpg',
      fileKey: 'sidfjaisjfisafj.jpg',
    },
  })
  async createUploadUrl(@Body() createUploadUrlDto: CreateUploadUrlDto) {
    const {uploadUrl, contentType, fileKey} = await this.mediaService.createUploadUrl(createUploadUrlDto.originalName,createUploadUrlDto.contentType);
    return {uploadUrl, contentType, fileKey}
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @ApiOperation({ summary: 'create new course' })
  @ApiResponse({
    type: Object,
    status: 201,
    example: {
      message: 'new course created',
      newCourse: {
        title: 'what is nestJs',
        description: 'this course is about working with...',
        price: 499,
        level: 'Archived',
        category: 'Programming',
        smallDescription: 'about js...',
        slug: 'string',
        status: 'Draft',
      },
    },
  })
  async create(@Body() createCourseDto: CreateCourseDto, @Req() req: Request) {
    const { newCourse } = await this.courseService.create(createCourseDto);
    const { userId } = req.user as JwtUser;
    newCourse.userId = new Types.ObjectId(userId);
    await newCourse.save();
    return { message: 'new course created', newCourse };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/upload-complete')
  async uploadComplete(@Body() 
  confirmUploadDto: ConfirmUploadDto,@Req() req:Request) {
    const { userId } = req.user as JwtUser;
    const {course} = await this.mediaService.completeUpload(confirmUploadDto,userId);
    return {message: 'upload completed', course};
  }
}
