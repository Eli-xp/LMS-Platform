import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { SmsModule } from './sms/sms.module';
import config from 'config'

@Module({
  imports: [MongooseModule.forRoot(config.get<string>('server.database.URL')), UsersModule, AuthModule, RedisModule, SmsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
