import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder , SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cors
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  });
  // cookie parser so nest can read cookies from req.cookies
  app.use(cookieParser());
  // pipes and dto validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  // swagger config
  const swaggerConfig = new DocumentBuilder()
  .setTitle('API documentation')
  .setDescription('this is API documentation for LMS')
  .setVersion('1.0')
  .build();
  const swaggerDocument = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('API_Docs',app,swaggerDocument);
  await app.listen(config.get<string>('server.PORT'));
  console.log(
    `app is running on port:${config.get<string>('server.PORT')}(${config.get<string>('server.ENV')}) and database connection is ready`,
  );
}
bootstrap();
