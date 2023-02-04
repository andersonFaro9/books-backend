import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksDto } from 'src/booksDto/books.dto';
import { BooksService } from '../services/books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() data: BooksDto) {
    return this.booksService.create(data);
  }
  @Get()
  findAll() {
    return this.booksService.findAll();
  }
}
