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
  Put,
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
import { Throttle } from '@nestjs/throttler';
import { UpdateCourseDto } from './dto/update-course.dto';


@Controller('admin')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly mediaService: MediaService,
    private readonly usersService: UsersService,
  ) {}

  @Post('course/upload-url')
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
  @Throttle({default:{limit:50,ttl:60_000}})
  @Post('course/create')
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
  @Post('course/upload-complete')
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
  @Throttle({default:{limit:50,ttl:60_000}})
  @Get('courses')
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
  @Throttle({default:{limit:50,ttl:60_000}})
  @Get('courses/:id')
  @ApiOperation({summary: 'return one course'})
  @ApiResponse({type:Object,status:200,example:{
    "_id": "6a81e6183ff6c222cd385ca6",
    "title": "grrerg",
    "description": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"attrs\":{\"textAlign\":null},\"content\":[{\"type\":\"text\",\"text\":\"Hello World🚀ergrergegegre\"}]}]}",
    "price": 12,
    "level": "Beginner",
    "category": "Web Development",
    "smallDescription": "rgeerrergegre",
    "slug": "grrerg",
    "status": "Draft",
    "createdAt": "2026-08-16T16:32:24.312Z",
    "updatedAt": "2026-08-16T16:32:24.793Z",
    "__v": 0,
    "thumbnail": "65479aa7-8d21-45ee-b08f-1214be23ecfd-ux honeycomb.png",
    "userId": "6a7465965d57a6a2aedcd26b"
  }})
  async getOneCourse(@Param('id') id: string){
    return this.courseService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Throttle({default:{limit:50,ttl:60_000}})
  @Delete('courses/:id')
  @ApiOperation({summary: 'delete a course'})
  @ApiResponse({type:Object,example:{message:'course deleted'}})
  async deleteOneCourse(@Param('id') id: string){
    return this.courseService.deleteOne(id);
  }

@UseGuards(AuthGuard('jwt'))
@Put('courses/edit/:id')
@ApiOperation({summary: 'edit course information'})
@ApiResponse({type: Object, status: 200, example:{message: 'course edited',url: 'https://parspack/asdkadi1123123.png', fields: 'policy'}})
async updateCourse(@Body() updateCourseDto: UpdateCourseDto, @Param('id') id: string, @Req() req: Request){
  const { userId } = req.user as JwtUser;
  console.log(userId);
  const { course } = await this.courseService.findOneAndUpdate(updateCourseDto,id,userId);
  if(updateCourseDto.thumbNail){
    const { url, fileKey, fields } = await this.mediaService.createUploadUrl(
      updateCourseDto.thumbNail!.originalName,
      updateCourseDto.thumbNail!.contentType,
    );
  course.thumbnail = fileKey;
  await course.save();
  return {message: 'course edited',url, fields}
  }
  
  return {message: 'course edited'}
}


  @UseGuards(AuthGuard('jwt'))
  @Get('course/view-url')
  async getViewUrl(@Query('fileKey') fileKey: string) {
    return this.mediaService.createViewUrl(fileKey);
  }
}
