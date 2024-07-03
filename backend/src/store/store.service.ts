import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Author } from '@prisma/client';
import { BookDto } from 'src/common/dto/book.dto';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async createAuthor(name: string) {
    try {
      return this.prisma.author.create({
        data: {
          name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createGenre(name: string) {
    try {
      return this.prisma.genre.create({
        data: {
          name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createBook(
    title: string,
    authorName: string,
    publicationDate: string,
    genreNames: string[],
  ) {
    const genres = [];
    let author: Author;
    try {
      for (const name of genreNames) {
        let genre = await this.prisma.genre.findFirst({
          where: { name },
        });

        if (!genre) {
          genre = await this.createGenre(name);
        }

        genres.push({ genre: { connect: { id: genre.id } } });
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    try {
      author = await this.prisma.author.findFirst({
        where: { name: authorName },
      });

      if (!author) {
        author = await this.createAuthor(authorName);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    try {
      return this.prisma.book.create({
        data: {
          title,
          genres: {
            create: genres,
          },
          author: {
            create: { name: author.name },
          },
          publicationDate,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAllBooks() {
    try {
      return this.prisma.book.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getBookById(id: number) {
    try {
      return this.prisma.book.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateBook(id: number, dto: BookDto) {
    try {
      return this.prisma.book.update({
        where: { id },
        data: {
          ...dto,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
