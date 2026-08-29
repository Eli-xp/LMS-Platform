import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/userSchema';
import { Course, CourseSchema } from 'src/course/schema/courseSchema';
import { MediaService } from 'src/media/media.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Course.name,
        schema: CourseSchema
      }
    ]),

  ],
  controllers: [UsersController],
  providers: [UsersService, MediaService],
})
export class UsersModule {}
