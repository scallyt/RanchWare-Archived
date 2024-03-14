import { Controller, Post, Body, Param, NotFoundException, UseGuards, Headers, Header   } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { Workspace } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post("/new")
  async create(@Headers() headers: any, @Body() dto: CreateWorkspaceDto ): Promise<Workspace> {
    return this.workspacesService.createWorkspace(headers);
  }

  @Post(':workspaceId/addEmployee/:userId')
  async addEmployee(@Param('workspaceId') workspaceId: number, @Param('userId') userId: number): Promise<Workspace> {
    const workspaceExists = await this.workspacesService.workspaceExists(workspaceId);
    if (!workspaceExists) {
      throw new NotFoundException('Workspace not found');
    }

    // Hívjuk meg a WorkspaceService addEmployee metódusát
    return this.workspacesService.addEmployee(workspaceId, userId);
  }
}
function HttpHeader(arg0: string): (target: WorkspacesController, propertyKey: "create", parameterIndex: 0) => void {
  throw new Error('Function not implemented.');
}

