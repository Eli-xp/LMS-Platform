import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from 'src/course/schema/courseSchema';
import { Model } from 'mongoose';
import { Chapter } from './schema/chapterSchema';
import { StructureDto } from './dto/structureDto';
import { Lesson } from 'src/lesson/schema/lessonSchema';
import { DeleteChapterDto } from './dto/deleteChapterDto';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Course.name) private readonly CourseModel: Model<Course>,
    @InjectModel(Chapter.name) private readonly ChapterModel: Model<Chapter>,
    @InjectModel(Lesson.name) private readonly LessonModel: Model<Lesson>,
    private readonly mediaService: MediaService
  ) {}

  async create(createChapterDto: CreateChapterDto) {
    // counting chapters in course model and adding 1 to it
    const chapterPosition =
      (await this.ChapterModel.countDocuments({
        courseId: createChapterDto.courseId,
      })) + 1;
    const newChapter = await this.ChapterModel.create({
      ...createChapterDto,
      position: chapterPosition,
    });
    // adding chapter id to course model
    await this.CourseModel.findByIdAndUpdate(createChapterDto.courseId, {
      $push: { chapters: newChapter._id },
    });
  }

  async update(structureDto: StructureDto) {
    const { chapters, lessons, courseId } = structureDto;
    await Promise.all([
       this.ChapterModel.bulkWrite(
        chapters!.map((chapter) => ({
          updateOne: {
            filter: {
              _id: chapter.id,
              courseId,
            },
            update: {
              $set: {
                position: chapter.position,
                title: chapter.title,
              },
            },
          },
        })),
      ),
       this.LessonModel.bulkWrite(
        lessons!.map((lesson) => ({
          updateOne: {
            filter: {
              _id: lesson.id,
            },
            update: {
              $set: {
                position: lesson.position,
                title: lesson.title,
              },
            },
          },
        })),
      ),
    ]);
  }

  async delete(deleteChapterDto: DeleteChapterDto){
    const chapter = await this.ChapterModel.findOne({_id: deleteChapterDto.chapterId, courseId: deleteChapterDto.courseId});
    if(!chapter){
      throw new NotFoundException('chapter not found')
    }
    const lessons = await this.LessonModel.find({chapterId: deleteChapterDto.chapterId}).select('videoKey thumbnailKey').lean();
    const fileKeys = lessons.flatMap((lesson)=>[
      lesson.videoKey,
      lesson.thumbnailKey
    ]);
    await Promise.all(
      fileKeys.map((fileKey)=>{
        this.mediaService.deleteUrl(fileKey)
      })
    )
    await Promise.all([
      this.LessonModel.deleteMany({chapterId: deleteChapterDto.chapterId}),
      this.ChapterModel.deleteOne({_id: deleteChapterDto.chapterId, courseId: deleteChapterDto.courseId}),
      this.CourseModel.updateOne({_id: deleteChapterDto.courseId},{$pull:{chapters:deleteChapterDto.chapterId}})
    ])
  }
}
