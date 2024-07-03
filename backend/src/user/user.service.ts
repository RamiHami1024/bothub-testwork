import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  readonly ADMIN = 1; // 0b001
  readonly USER = 2; // 0b010
  readonly MODERATOR = 4; // 0b100
  constructor(private prisma: PrismaService) {}

  async createUser(
    email: string,
    password: string,
    roles: number,
    username: string,
  ): Promise<void> {
    try {
      await this.prisma.user.create({
        data: {
          email,
          password,
          roles,
          username,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async loginUser(username: string, password: string) {
    return { username, password };
  }

  async getUserByName(username: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { username },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUserRoles(id: number, roles: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { roles },
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async hasRole(userId: number, role: number): Promise<boolean> {
    const user = await this.getUserById(userId);
    if (!user) return false;
    return (user.roles & role) === role;
  }

  async addRole(userId: number, role: number): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found');
    return this.updateUserRoles(userId, user.roles | role);
  }

  async removeRole(userId: number, role: number): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found');
    return this.updateUserRoles(userId, user.roles & ~role);
  }
}
