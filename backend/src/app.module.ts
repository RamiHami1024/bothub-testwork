import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './common/services/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { StoreController } from './store/store.controller';
import { StoreService } from './store/store.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UserController, StoreController],
  providers: [
    AppService,
    UserService,
    PrismaService,
    JwtService,
    AuthService,
    StoreService,
  ],
})
export class AppModule {}
