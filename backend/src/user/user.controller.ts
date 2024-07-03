import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';
// import { User } from '@prisma/client';
import { ParseIntPipe } from '../common/pipes/isNaN.pipe';
import { SafetyUserData } from 'src/common/interfaces/user.interface';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async createUser(
    @Body()
    body: {
      email: string;
      password: string;
      roles: number;
      username: string;
    },
  ): Promise<void> {
    return this.usersService.createUser(
      body.email,
      body.password,
      body.roles,
      body.username,
    );
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }
  //
  @Get('test')
  async test() {
    return this.usersService.hasRole(10, 1);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SafetyUserData | null> {
    return this.usersService.getUserById(Number(id));
  }

  @UseGuards(AuthGuard)
  @Put(':id/role')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { role: number; add: boolean },
  ): Promise<SafetyUserData> {
    return this.usersService.updateRole(id, body.role, body.add);
  }
}
