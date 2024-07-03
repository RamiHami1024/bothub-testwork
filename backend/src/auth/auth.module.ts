import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: `TOPSECRETKEY`,
      signOptions: { expiresIn: '60h' },
    }),
  ],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
