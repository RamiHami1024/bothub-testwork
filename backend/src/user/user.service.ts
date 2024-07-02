import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  static readonly USER = 1;
  static readonly ADMIN = 2;
  static readonly MODERATOR = 4;
  static readonly SUPER_ADMIN = 8;

	constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
  
  //
  // async updateUserRoles(userId: number, roles: number): Promise<User> {
  //   return this.prisma.user.update({
  //     where: { id: userId },
  //     data: { 
  //       roles
  //     },
  //   });
  // }

  // async getUserRoles(userId: number): Promise<number> {
  //   const user = await this.prisma.user.findUnique({
  //     where: { id: userId },
  //     select: { roles: true },
  //   });
  //   return user.roles;
  // }
  //
  
  hasRole(userRoles: number, role: number): boolean {
    return (userRoles & role) === role;
  }

  getRoles(userRoles: number): string[] {
    const roles = [];
    if (this.hasRole(userRoles, UserService.USER)) roles.push('USER');
    if (this.hasRole(userRoles, UserService.ADMIN)) roles.push('ADMIN');
    if (this.hasRole(userRoles, UserService.MODERATOR)) roles.push('MODERATOR');
    if (this.hasRole(userRoles, UserService.SUPER_ADMIN)) roles.push('SUPER_ADMIN');
    return roles;
  }
}
