import { Controller, Post, Body, Param, NotFoundException, UseGuards, Headers, Header   } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Workspace, WorkspacesOnUsers } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { any } from 'zod';
import { JoinWorkspaceDTO } from './dto/join-workspace.dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post("/new")
  async create(@Headers() headers: any, @Body() dto: CreateWorkspaceDto ): Promise<Workspace> {
    return this.workspacesService.createWorkspace(headers);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/join')
  async addEmployee(@Headers() headers: any, @Body() dto: JoinWorkspaceDTO): Promise<WorkspacesOnUsers> {
    const workspaceExists = await this.workspacesService.workspaceExists(dto);
    if (!workspaceExists) {
      throw new NotFoundException('Workspace not found');
    }

    return this.workspacesService.addEmployee(dto, headers);
  }
}

