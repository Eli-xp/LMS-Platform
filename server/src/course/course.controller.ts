import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateUploadUrlDto } from 'src/media/DTO/create-upload-dto';
import { MediaService } from 'src/media/media.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { JwtUser } from 'src/auth/auth.controller';
import { Types } from 'mongoose';
import { ConfirmUploadDto } from 'src/media/DTO/confirmUploadDto';
import { UsersService } from 'src/users/users.service';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly mediaService: MediaService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/upload-url')
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
    const { url, fileKey } = await this.mediaService.createUploadUrl(
      createUploadUrlDto.originalName,
      createUploadUrlDto.contentType,
    );
    return { url, fileKey };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  @ApiOperation({ summary: 'create new course' })
  @ApiResponse({
    type: Object,
    status: 201,
    example: {
      message: 'new course created',
      url: 'https"//padaiodsfpwer123123qwd.png',
      field: {
        key: 'LMS/Assets/abc.png',
        'Content-Type': 'image/png',
        Policy: '...',
        'X-Amz-Algorithm': 'AWS4-HMAC-SHA256',
        'X-Amz-Credential': '...',
        'X-Amz-Date': '...',
        'X-Amz-Signature': '...',
      },
    },
  })
  async create(@Body() createCourseDto: CreateCourseDto, @Req() req: Request) {
    const { url, fileKey, fields } = await this.mediaService.createUploadUrl(
      createCourseDto.thumbNail!.originalName,
      createCourseDto.thumbNail!.contentType,
    );
    const { newCourse } = await this.courseService.create(createCourseDto);
    const { userId } = req.user as JwtUser;
    newCourse.userId = new Types.ObjectId(userId);
    newCourse.thumbnail = fileKey;
    await newCourse.save();
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.courses?.push(newCourse._id);
    await user.save();
    return { message: 'new course created', url, fields };
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'check for successfully uploads' })
  @ApiResponse({
    type: Object,
    status: 200,
    example: {
      message: 'upload completed',
      course: 'course infos',
    },
  })
  @Post('/upload-complete')
  async uploadComplete(
    @Body()
    confirmUploadDto: ConfirmUploadDto,
    @Req() req: Request,
  ) {
    const { userId } = req.user as JwtUser;
    const { course } = await this.mediaService.completeUpload(
      confirmUploadDto,
      userId,
    );
    return { message: 'upload completed', course };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/courses')
  @ApiOperation({ summary: 'return all courses' })
  @ApiResponse({
    type: Array,
    status: 200,
    example: {
      _id: '6a7bbb6f4e9d50b549c8cb41',
      title: 'what is nestJs',
      price: 499,
      level: 'Beginner',
      smallDescription: 'about js...',
      slug: 'string',
      status: 'Draft',
    },
  })
  async getCourses() {
    return this.courseService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/view-url')
  async getViewUrl(@Query('fileKey') fileKey: string) {
    return this.mediaService.createViewUrl(fileKey);
  }
}
