import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { StoreModule } from './store/store.module';

@Module({
  imports: [ConfigModule.forRoot(), StoreModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaService, JwtService, AuthService],
})
export class AppModule {}
