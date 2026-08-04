import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/userSchema';
import { JwtModule } from '@nestjs/jwt';
import config from 'config';
import { JwtStrategy } from './strategies/jwt-strategy';
import { RedisService } from 'src/redis/redis.service';
import { SmsService } from 'src/sms/sms.service';

@Module({
  imports: [
    JwtModule.register({
      secret: config.get<string>('server.jwt.SECRET'),
      signOptions: { expiresIn: config.get<number>('server.jwt.EXPIRES_IN') },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy, RedisService, SmsService]
})
export class AuthModule {}
