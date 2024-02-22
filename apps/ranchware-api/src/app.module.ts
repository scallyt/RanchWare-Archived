import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';;
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
