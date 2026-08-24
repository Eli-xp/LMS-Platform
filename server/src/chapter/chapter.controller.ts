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
import { ChapterService } from './chapter.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StructureDto } from './dto/structureDto';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @ApiOperation({ summary: 'create chapter' })
  @ApiResponse({
    type: Object,
    status: 200,
    example: { message: 'chapter created' },
  })
  async create(@Body() createChapterDto: CreateChapterDto) {
    await this.chapterService.create(createChapterDto);
    return { message: 'chapter created' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('allUpdate')
  @ApiOperation({summary: 'update all sent chapters and lessons'})
  @ApiResponse({type:Object, status:200, example:{message:'edited'}})
  async update(@Body() structureDto: StructureDto) {
    await this.chapterService.update(structureDto);
    return { message: 'edited' };
  }
}
