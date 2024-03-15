import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [WorkspacesController],
  providers: [WorkspacesService, PrismaService, JwtService,
  {
    provide: APP_GUARD,
    useClass: JwtService,
  }
  ],
})
export class WorkspacesModule {}
