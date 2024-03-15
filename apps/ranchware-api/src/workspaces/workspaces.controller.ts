import { Controller, Post, Body, Param, NotFoundException, UseGuards, Headers, Header, HttpStatus, HttpCode   } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Workspace, WorkspacesOnUsers } from '@prisma/client';
import { JoinWorkspaceDTO } from './dto/join-workspace.dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post("/new")
  async create(@Headers() headers: string, @Body() dto: CreateWorkspaceDto ): Promise<Workspace> {
    return this.workspacesService.createWorkspace(headers);
  }

  @Post('/join')
  async addEmployee(@Headers() headers: string, @Body() dto: JoinWorkspaceDTO): Promise<WorkspacesOnUsers> {
    return this.workspacesService.addEmployee(dto, headers);
  }
}

