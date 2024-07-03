import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
// import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';

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

  // @Get(':id')
  // async getUserById(@Param('id') id: number): Promise<User | null> {
  //   return this.usersService.getUserById(Number(id));
  // }

  // @Patch(':id/roles')
  // async updateUserRoles(
  //   @Param('id') id: number,
  //   @Body() body: { roles: number },
  // ): Promise<User> {
  //   return this.usersService.updateUserRoles(Number(id), body.roles);
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: number): Promise<User> {
  //   return this.usersService.deleteUser(Number(id));
  // }

  // // Endpoints for role management
  // @Get(':id/roles/:role')
  // async hasRole(
  //   @Param('id') id: number,
  //   @Param('role') role: number,
  // ): Promise<boolean> {
  //   return this.usersService.hasRole(Number(id), Number(role));
  // }

  // @Patch(':id/roles/add')
  // async addRole(
  //   @Param('id') id: number,
  //   @Body() body: { role: number },
  // ): Promise<User> {
  //   return this.usersService.addRole(Number(id), body.role);
  // }

  // @Patch(':id/roles/remove')
  // async removeRole(
  //   @Param('id') id: number,
  //   @Body() body: { role: number },
  // ): Promise<User> {
  //   return this.usersService.removeRole(Number(id), body.role);
  // }
}
