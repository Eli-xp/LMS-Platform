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
    private readonly usersService: UsersService
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
    const {uploadUrl, fileKey} = await this.mediaService.createUploadUrl(createUploadUrlDto.originalName,createUploadUrlDto.contentType);
    return {uploadUrl, fileKey}
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
        thumbNail:{
          originalName:'js events',
          contentType:'video/mp4'
        }
      },
    },
  })
  async create(@Body() createCourseDto: CreateCourseDto, @Req() req: Request) {
    const { uploadUrl,fileKey } = await this.mediaService.createUploadUrl(createCourseDto.thumbNail!.originalName,createCourseDto.thumbNail!!.contentType)
    const { newCourse } = await this.courseService.create(createCourseDto);
    const { userId } = req.user as JwtUser;
    newCourse.userId = new Types.ObjectId(userId);
    newCourse.thumbnail = fileKey;
    await newCourse.save();
    const user = await this.usersService.findById(userId);
    if(!user){
      throw new NotFoundException('user not found')
    }
    user.courses?.push(newCourse._id)
    await user.save()
    return { message: 'new course created', uploadUrl ,newCourse };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/upload-complete')
  async uploadComplete(@Body() 
  confirmUploadDto: ConfirmUploadDto,@Req() req:Request) {
    const { userId } = req.user as JwtUser;
    const {course} = await this.mediaService.completeUpload(confirmUploadDto,userId);
    return {message: 'upload completed', course};
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('/view-url')
  async getViewUrl(@Query('fileKey') fileKey: string){
    return this.mediaService.createViewUrl(fileKey)
  }



}
