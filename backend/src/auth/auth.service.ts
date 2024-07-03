import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(name: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByName(name);
    if (user && user.password === pass) {
      const payload = { sub: user.id, username: user.username };

      return {
        access_token: await this.jwtService.signAsync(payload, {
          secret: process.env.JWT_KEY,
        }),
      };
    }

    throw new UnauthorizedException();
  }
}
