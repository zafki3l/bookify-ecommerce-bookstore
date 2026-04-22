import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateRolePermissionDto } from '../../dto/role-permission/create-role-permission.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindRolePermissionQuery } from '../../../application/queries/role-permission/find-role-permission.query';
import { RolePermissionResponseDto } from '../../dto/role-permission/role-permision-response.dto';

@Controller('role-permission')
export class RolePermissionController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll() {
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
  findOne(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ) {
    return `role ${roleId}, permission ${permissionId}`;
  }

  @Post()
  create(@Body() createRolePermission: CreateRolePermissionDto) {}

  @Delete(':roleId/:permissionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ) {}
}
