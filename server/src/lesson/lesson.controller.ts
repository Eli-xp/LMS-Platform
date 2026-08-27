import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { MediaService } from 'src/media/media.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteLessonDto } from './dto/deleteLessonDto';

@Controller('admin/lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly mediaService: MediaService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @ApiOperation({ summary: 'create lesson' })
  @ApiResponse({
    type: Object,
    status: 201,
    example: {
      message: 'new lesson created',
      url: 'https://parspack/1231/asdsad1515asd.net',
    },
  })
  async create(@Body() createLessonDto: CreateLessonDto) {
    // getting thumbnail post url
    return this.lessonService.create(createLessonDto);
    // const { url, fields, fileKey } = await this.mediaService.createUploadUrl(
    //   createLessonDto.thumbnailObject.originalname,
    //   createLessonDto.thumbnailObject.contentType,
    // );
    // newLesson.thumbnailKey = fileKey;
    // await newLesson.save();

  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  @ApiOperation({ summary: 'delete one lesson' })
  async delete(@Body() deleteLessonDto: DeleteLessonDto) {
    return this.lessonService.delete(deleteLessonDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'get one lesson' })
  @ApiResponse({
    type: Object,
    status: 200,
    example:{
      title:'nestJs for back-end',
      description:'this is a test desc',
      thumbnailKey:'https://parspack/1231/asdsad1515asd.net',
      videoKey:'https://parspack/1231/asdsad1515asd.net',
      position:1,
      chapterId:'asd9asd9a89d89ad98'
    }
  })
  async findOne(@Param('id') id: string) {
    const { lesson } = await this.lessonService.findOne(id);
    // const [videoUrl, thumbnailUrl] = await Promise.all([
    //   this.mediaService.createViewUrl(lesson.videoKey),
    //   this.mediaService.createViewUrl(lesson.thumbnailKey)
    // ])
    // lesson.videoKey = videoUrl.viewUrl;
    // lesson.thumbnailKey = thumbnailUrl.viewUrl;
    return lesson;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'edit one lesson' })
  @ApiResponse({
    type: Object,
    status: 201,
    example: {
      message: 'lesson updated',
      url: 'https://parspack/1231/asdsad1515asd.net',
      fields: {},
      videoKey: {user: 'https://parspack/1231/asdsad1515asd.net', fields:{}}
    },
  })
  async updateOne(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    const { lesson } = await this.lessonService.updateOne(id,updateLessonDto);
    const { url, fileKey, fields } = await this.mediaService.createUploadUrl(
      updateLessonDto.thumbnailObject!.originalname,
      updateLessonDto.thumbnailObject!.contentType
    )
    const videoKey = await this.mediaService.createUploadUrl(
      updateLessonDto.videoObject!.originalname,
      updateLessonDto.videoObject!.contentType
    )
    lesson!.thumbnailKey = fileKey;
    lesson!.videoKey = videoKey.fileKey
    await lesson!.save()
    return { message: 'new lesson created', url, fields, videoKey };
  }
}
