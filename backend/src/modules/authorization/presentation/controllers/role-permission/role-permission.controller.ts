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

@Controller('role-permission')
export class RolePermissionController {
  @Get()
  findAll() {
    return 'permission-role';
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
