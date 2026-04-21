import {
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
  create() {}

  @Patch(':id')
  update(@Param('id') id: string) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {}
}
