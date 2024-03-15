import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Workspace, WorkspacesOnUsers } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JoinWorkspaceDTO } from './dto/join-workspace.dto';

@Injectable()
export class WorkspacesService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  generateWorkspaceCode() {
    const chars: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  authTokenDecode(headers) {
    const authorization = headers['authorization'];
    const token: string = authorization.split(' ')[1];
    const payload: string = this.jwtService.decode(token);

    return payload;
  }

  async createWorkspace(headers: string): Promise<Workspace> {
    if (headers['authorization'] === undefined) {
      throw new Error('hinnye');
    }

    const code = this.generateWorkspaceCode();
    const payload = this.authTokenDecode(headers);

    const user = await this.prisma.user.findUnique({
      where: {
        id: String(payload.sub),
      },
    });

    if (!user) {
      throw new BadRequestException('Unknown id', {
        cause: new Error(),
        description: 'Owner with the specified ID not found.',
      });
    } else {
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
          ownerId: String(payload.sub),
          code: code,
        },
      });
    }
  }

  async addEmployee(
    dto: JoinWorkspaceDTO,
    headers: string,
  ): Promise<WorkspacesOnUsers | any> {
    if (headers['authorization'] === undefined) {
      throw new Error('hinnye');
    }
    const payload = this.authTokenDecode(headers);

    const workspaceExists = await this.workspaceExists(dto);
    if (!workspaceExists) {
      throw new NotFoundException('Workspace not found');
    }

    const isCode = await this.prisma.workspace.findFirst({
      where: {
        code: dto.code,
      },
    });

    if (isCode) {
      let JoinWorkspace = await this.prisma.workspacesOnUsers.create({
        data: {
          userId: String(payload.sub),
          workspaceId: isCode.id,
        },
      });
      return JoinWorkspace;
    } else {
      return new NotFoundException('Workspace not found');
    }
  }

  async workspaceExists(dto: JoinWorkspaceDTO): Promise<Boolean> {
    const workspace = await this.prisma.workspace.findUnique({
      where: {
        code: dto.code,
      },
    });
    return !!workspace;
  }
}
