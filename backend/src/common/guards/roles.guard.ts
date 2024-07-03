import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { UserRoles } from '../variables';

export interface UserRequestInfo extends Request {
  user: {
    username: string;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: UserRequestInfo = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new UnauthorizedException();
    }

    return await this.userService.hasRole(
      request.user.username,
      UserRoles.ADMIN,
    );
  }
}
