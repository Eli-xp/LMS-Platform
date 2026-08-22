import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}


  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @ApiOperation({ summary: 'create chapter' })
  @ApiResponse({ type: Object, status: 200, example: { message: 'chapter created' } })
  async create(@Body() createChapterDto: CreateChapterDto) {
    await this.chapterService.create(createChapterDto);
    return { message: 'chapter created' };
  }

 
  
  
}
