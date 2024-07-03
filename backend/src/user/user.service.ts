import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { SafetyUserData } from 'src/common/interfaces/user.interface';

@Injectable()
export class UserService {
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

  async getUserById(id: number): Promise<SafetyUserData | null> {
    const user: User = await this.prisma.user.findUnique({
      where: { id },
    });

    return this.safetyUserData(user);
  }

  async updateUserRoles(id: number, roles: number): Promise<SafetyUserData> {
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: { roles },
    });

    return this.safetyUserData(updateUser);
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async hasRole(userData: number | string, role: number): Promise<boolean> {
    let user: SafetyUserData;
    if (typeof userData !== 'string') {
      user = await this.getUserById(userData);
    } else {
      user = await this.getUserByName(userData);
    }

    if (!user) return false;
    return (user.roles & role) === role;
  }

  async updateRole(
    userId: number,
    role: number,
    add: boolean,
  ): Promise<SafetyUserData> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error('User not found');

    const updatedRoles = add ? user.roles | role : user.roles & ~role;
    return this.updateUserRoles(userId, updatedRoles);
  }

  // async addRole(userId: number, role: number): Promise<SafetyUserData> {
  //   const user = await this.getUserById(userId);
  //   if (!user) throw new Error('User not found');
  //   return this.updateUserRoles(userId, user.roles | role);
  // }

  // async removeRole(userId: number, role: number): Promise<SafetyUserData> {
  //   const user = await this.getUserById(userId);
  //   if (!user) throw new Error('User not found');
  //   return this.updateUserRoles(userId, user.roles & ~role);
  // }

  protected safetyUserData(user: User): SafetyUserData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...safetyUserData } = user;
    return safetyUserData;
  }
}
