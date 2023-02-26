import { BooksController } from './controllers/books.controller';
import { NestFactory } from '@nestjs/core';
import { BooksModule } from './modules/books.module';

async function bootstrap() {
  const app = await NestFactory.create(BooksModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
