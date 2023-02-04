import { Module } from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { BooksController } from '../controllers/books.controller';
import { PrismaService } from '../services/prisma.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
})
export class BooksModule {}
