import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'config'

@Module({
  imports: [MongooseModule.forRoot(config.get<string>('server.database.URL'))],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
