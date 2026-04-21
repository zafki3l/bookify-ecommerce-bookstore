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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindRolesQuery } from '../../../application/queries/roles/find-roles.query';
import { RoleResponseDto } from '../../dto/roles/role-response.dto';
import { FindOneRoleQuery } from '../../../application/queries/roles/find-one-role.query';
import { CreateRoleDto } from '../../dto/roles/create-role.dto';
import ExceptionHandler from '../../../../../shared/exception/exception.handler';
import { CreateRoleCommand } from '../../../application/commands/roles/create-role.command';
import { UpdateRoleDto } from '../../dto/roles/update-role.dto';
import { UpdateRoleCommand } from '../../../application/commands/roles/update-role.command';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(): Promise<RoleResponseDto[]> {
    const roles = await this.queryBus.execute(new FindRolesQuery());

    return roles
      ? roles.map((role) => new RoleResponseDto(role.id, role.name))
      : [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RoleResponseDto> {
    const role = await this.queryBus.execute(new FindOneRoleQuery(id));

    return new RoleResponseDto(role.id, role.name);
  }

  @Post()
  async create(@Body() createRole: CreateRoleDto): Promise<RoleResponseDto> {
    try {
      const role = await this.commandBus.execute(
        new CreateRoleCommand(createRole.name),
      );

      return new RoleResponseDto(role.getId(), role.getName());
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRole: UpdateRoleDto) {
    try {
      const role = await this.commandBus.execute(
        new UpdateRoleCommand(id, updateRole.name),
      );

      return new RoleResponseDto(role.getId(), role.getName());
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {}
}
