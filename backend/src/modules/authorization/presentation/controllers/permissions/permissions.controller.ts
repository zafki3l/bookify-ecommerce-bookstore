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
import { CreatePermissionDto } from '../../dto/permissions/create-permission.dto';

@Controller('permissions')
export class PermissionsController {
  @Get()
  findAll() {
    return 'Permissions';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Permission with id: ${id}`;
  }

  @Post()
  create(@Body() createPermission: CreatePermissionDto) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {}
}
