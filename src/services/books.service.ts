import { Injectable } from '@nestjs/common';

import { PrismaService } from '../services/prisma.service';
import { BooksDto } from './../booksDto/books.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: BooksDto) {
    const booksExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (booksExists) {
      throw new Error('Book exist');
    }

    const books = await this.prisma.book.create({
      data,
    });

    return books;
  }

  async findAll() {
    return this.prisma.book.findMany();
  }
  async update(id: string, data: BooksDto) {
    const booksExists = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!booksExists) {
      throw new Error('Book does  not exists');
    }

    return await this.prisma.book.update({
      data,
      where: { id },
    });
  }

  async delete(id: string) {
    const booksExists = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!booksExists) {
      throw new Error('Book does  not exists');
    }

    return this.prisma.book.delete({
      where: { id },
    });
  }
}
