import { Module } from '@nestjs/common';
import { MediaService } from './media.service';


@Module({
  controllers: [],
  providers: [MediaService],
})
export class MediaModule {}
