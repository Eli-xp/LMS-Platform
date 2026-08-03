import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(config.get<string>('server.PORT'));
  console.log(
    `app is running on port:${config.get<string>('server.PORT')}(${config.get<string>('server.ENV')}) and database connection is ready`,
  );
}
bootstrap();
