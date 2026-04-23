import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindRolesUseCase } from '../../../application/use-cases/find-roles.use-case';
import { FindRolesResponse } from '../../../application/responses/find-roles.response';
import { FindOneRoleUseCase } from '../../../application/use-cases/find-one-role.use-case';
import { FindOneRoleResponse } from '../../../application/responses/find-one-role.response';
import { CreateRoleRequest } from '../../requests/create-role.request';
import ExceptionHandler from '../../../../../shared/exception/exception.handler';
import { CreateRoleUseCase } from '../../../application/use-cases/create-role.use-case';
import { RenameRoleRequest } from '../../requests/rename-role.request';
import { RenameRoleUseCase } from '../../../application/use-cases/rename-role.use-case';
import { AssignPermissionRequest } from '../../requests/assign-permission.request';

@Controller('roles')
export class RolesController {
  public constructor(
    private readonly findRolesUseCase: FindRolesUseCase,
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly renameRoleUseCase: RenameRoleUseCase,
  ) {}

  @Get()
  public async findAll(): Promise<FindRolesResponse[]> {
    const roles = await this.findRolesUseCase.execute();

    return roles;
  }

  @Get(':id')
  public async findOne(
    @Param('id') id: string,
  ): Promise<FindOneRoleResponse | null> {
    const role = await this.findOneRoleUseCase.execute(id);

    return role;
  }

  @Post()
  public async create(@Body() request: CreateRoleRequest): Promise<void> {
    try {
      await this.createRoleUseCase.execute(request);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Patch(':id')
  public async rename(
    @Param('id') id: string,
    @Body() request: RenameRoleRequest,
  ): Promise<void> {
    try {
      await this.renameRoleUseCase.execute(id, request);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Post(':id/permissions')
  public async grantPermission(
    @Param('id') id: string,
    @Body() request: AssignPermissionRequest,
  ): Promise<void> {
    try {
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }
}
