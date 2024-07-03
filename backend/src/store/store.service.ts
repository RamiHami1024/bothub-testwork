import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  async createBook() {
    return {};
  }
}
