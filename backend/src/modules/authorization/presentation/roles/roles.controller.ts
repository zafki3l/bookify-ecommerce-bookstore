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
  UseGuards,
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
import { DeleteRoleUseCase } from '../../application/role-use-cases/delete-role/delete-role.use-case';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';
import { CurrentUser } from '../../../../shared/decorators/current-user.decorator';

@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
  public constructor(
    private readonly findRolesUseCase: FindRolesUseCase,
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly renameRoleUseCase: RenameRoleUseCase,
    private readonly grantPermissionUseCase: GrantPermissionUseCase,
    private readonly revokePermissionUseCase: RevokePermissionUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
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
  public async create(
    @Body() request: CreateRoleRequest,
    @CurrentUser('id') userId: string,
  ): Promise<void> {
    try {
      await this.createRoleUseCase.execute(request, userId);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Patch(':id')
  public async rename(
    @Param('id') id: string,
    @Body() request: RenameRoleRequest,
    @CurrentUser('id') userId: string,
  ): Promise<void> {
    try {
      await this.renameRoleUseCase.execute(id, request, userId);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Post(':id/permissions')
  public async grantPermission(
    @Param('id') id: string,
    @Body() request: GrantPermissionRequest,
    @CurrentUser('id') userId: string,
  ): Promise<void> {
    try {
      await this.grantPermissionUseCase.execute(id, request, userId);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Delete(':id/permissions/:permissionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async revokePermission(
    @Param('id') id: string,
    @Param('permissionId') permissionId: string,
    @CurrentUser('id') userId: string,
  ): Promise<void> {
    try {
      await this.revokePermissionUseCase.execute(id, permissionId, userId);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async remove(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ): Promise<void> {
    try {
      await this.deleteRoleUseCase.execute(id, userId);
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }
}
