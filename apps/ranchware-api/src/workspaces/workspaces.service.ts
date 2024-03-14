import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Workspace } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WorkspacesService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  generateWorkspaceCode() {
    const chars: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async createWorkspace(headers: string): Promise<Workspace> {
    if (!headers) {
      throw new BadRequestException('Authorization header is missing');
    }
    if(headers) {
      console.log(headers)
      const authorization = headers['authorization'];
      const token = authorization.split(' ')[1];
      const payload = this.jwtService.decode(token);
    const code = this.generateWorkspaceCode();
  
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
  
    if (!user) {
      throw new BadRequestException('Unknown id', {
        cause: new Error(),
        description: 'Owner with the specified ID not found.',
      });
    } else {
      // Check if workspace with the given code already exists
      const existingWorkspace = await this.prisma.workspace.findFirst({
        where: {
          code: code,
        },
      });
  
      if (existingWorkspace) {
        throw new BadRequestException('Workspace code already exists');
      }
  
      return this.prisma.workspace.create({
        data: {
          ownerId: payload.sub,
          code: code,
        },
      });
    }
    }
  }
  

  async addEmployee(workspaceId: number, userId: number): Promise<Workspace> {
    const workspaceExists = await this.workspaceExists(workspaceId);
    if (!workspaceExists) {
      throw new NotFoundException('Workspace not found');
    }

    return this.prisma.workspace.update({
      where: { id: workspaceId },
      data: {
        employees: {
          connect: {
            userId_workspaceId: { userId: userId, workspaceId: workspaceId },
          },
        },
      },
    });
  }
  async workspaceExists(workspaceId: number): Promise<boolean> {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
    });
    return !!workspace;
  }
}
