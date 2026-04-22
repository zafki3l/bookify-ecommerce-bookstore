import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateRolePermissionDto } from '../../dto/role-permission/create-role-permission.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindRolePermissionQuery } from '../../../application/queries/role-permission/find-role-permission.query';
import { RolePermissionResponseDto } from '../../dto/role-permission/role-permision-response.dto';
import { FindOneRolePermissionQuery } from '../../../application/queries/role-permission/find-one-role-permission.query';
import ExceptionHandler from '../../../../../shared/exception/exception.handler';
import { CreateRolePermissionCommand } from '../../../application/commands/role-permission/create-role-permission.command';

@Controller('role-permission')
export class RolePermissionController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(): Promise<RolePermissionResponseDto[]> {
    const rolePermissions = await this.queryBus.execute(
      new FindRolePermissionQuery(),
    );

    return rolePermissions
      ? rolePermissions.map(
          (rolePermission) =>
            new RolePermissionResponseDto(
              rolePermission.roleId,
              rolePermission.permissionId,
            ),
        )
      : [];
  }

  @Get(':roleId/:permissionId')
  async findOne(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ): Promise<RolePermissionResponseDto | null> {
    const rolePermission = await this.queryBus.execute(
      new FindOneRolePermissionQuery(roleId, permissionId),
    );

    if (!rolePermission) {
      return null;
    }

    return new RolePermissionResponseDto(
      rolePermission.roleId,
      rolePermission.permissionId,
    );
  }

  @Post()
  async create(
    @Body() createRolePermission: CreateRolePermissionDto,
  ): Promise<RolePermissionResponseDto> {
    try {
      const rolePermission = await this.commandBus.execute(
        new CreateRolePermissionCommand(
          createRolePermission.roleId,
          createRolePermission.permissionId,
        ),
      );

      return new RolePermissionResponseDto(
        rolePermission.getRoleId(),
        rolePermission.getPermissionId(),
      );
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Delete(':roleId/:permissionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ) {}
}
