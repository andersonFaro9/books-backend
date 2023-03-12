import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { PrismaService } from '../services/prisma.service';
import { BooksDto } from './../booksDto/books.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(data: BooksDto) {
    const barCodeExist = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (barCodeExist) {
      throw new UnprocessableEntityException('bar code já cadastrado');
    }

    const books = await this.prisma.book.create({
      data,
    });
    return books;
  }
  async findOne(id: string) {
    console.log(id);
    const books = await this.prisma.book.findUnique({
      where: { id: String(id) },
    });

    if (!books) {
      throw new Error('details does  not exists');
    }
    return books;
  }

  async findAll() {
    const books = await this.prisma.book.findMany();
    console.log(books);
    return books;
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
