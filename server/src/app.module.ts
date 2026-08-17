import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { SmsModule } from './sms/sms.module';
import { CourseModule } from './course/course.module';
import { MediaModule } from './media/media.module';
import config from 'config'
import { LoggerMiddleware } from 'middleware/logger.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [MongooseModule.forRoot(config.get<string>('server.database.URL')), UsersModule, AuthModule, RedisModule, SmsModule, CourseModule, MediaModule,ThrottlerModule.forRoot([
    {
      name:'default',
      ttl: 60_000,
      limit:10
    }
  ])],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass:ThrottlerGuard
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
