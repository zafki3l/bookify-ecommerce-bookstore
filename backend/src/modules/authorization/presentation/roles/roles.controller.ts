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
import { FindRolesUseCase } from '../../application/role-use-cases/find-roles/find-roles.use-case';
import { FindOneRoleUseCase } from '../../application/role-use-cases/find-one-role/find-one-role.use-case';
import { CreateRoleUseCase } from '../../application/role-use-cases/create-role/create-role.use-case';
import { RenameRoleUseCase } from '../../application/role-use-cases/rename-role/rename-role.use-case';
import { FindRolesResponse } from '../../application/role-use-cases/find-roles/find-roles.response';
import { FindOneRoleResponse } from '../../application/role-use-cases/find-one-role/find-one-role.response';
import { CreateRoleRequest } from './requests/create-role.request';
import { RenameRoleRequest } from './requests/rename-role.request';
import { GrantPermissionRequest } from './requests/grant-permission.request';
import { GrantPermissionUseCase } from '../../application/role-use-cases/grant-permission/grant-permission.use-case';
import ExceptionHandler from '../../../../shared/domain/exception/exception.handler';
import { RevokePermissionUseCase } from '../../application/role-use-cases/revoke-permission/revoke-permission.use-case';

@Controller('roles')
export class RolesController {
  public constructor(
    private readonly findRolesUseCase: FindRolesUseCase,
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly renameRoleUseCase: RenameRoleUseCase,
    private readonly grantPermissionUseCase: GrantPermissionUseCase,
    private readonly revokePermissionUseCase: RevokePermissionUseCase,
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
    @Body() request: GrantPermissionRequest,
  ): Promise<void> {
    try {
      await this.grantPermissionUseCase.execute(id, request);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Delete(':id/permissions/:permissionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async revokePermission(
    @Param('id') id: string,
    @Param('permissionId') permissionId: string,
  ): Promise<void> {
    try {
      await this.revokePermissionUseCase.execute(id, permissionId);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }
}
