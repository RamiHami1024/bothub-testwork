import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { Book } from '@prisma/client';
import { ParseIntPipe } from 'src/common/pipes/isNaN.pipe';
import { BookDto } from 'src/common/dto/book.dto';

@Controller('books')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createBook(
    @Body()
    body: {
      title: string;
      author: string;
      publicationDate: string;
      genres: string[];
    },
  ): Promise<Book | null> {
    return this.storeService.createBook(
      body.title,
      body.author,
      body.publicationDate,
      body.genres,
    );
  }

  @Get()
  async getAllBooks(): Promise<Book[] | null> {
    return this.storeService.getAllBooks();
  }

  @Get(':id')
  async getBookById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Book | null> {
    return this.storeService.getBookById(id);
  }

  @Put(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: BookDto,
  ): Promise<Book | null> {
    return this.storeService.updateBook(id, dto);
  }
}
