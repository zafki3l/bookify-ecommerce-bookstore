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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PermissionResponseDto } from '../../dto/permissions/permission-response.dto';
import { FindPermissionsQuery } from '../../../application/queries/permissions/find-permissions.query';
import ExceptionHandler from '../../../../../shared/exception/exception.handler';
import { CreatePermissionCommand } from '../../../application/commands/permissions/create-permission.command';
import { FindOnePermissionQuery } from '../../../application/queries/permissions/find-one-permission.query';
import { DeletePermissionCommand } from '../../../application/commands/permissions/delete-permission.command';

@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findAll(): Promise<PermissionResponseDto[]> {
    const permissions = await this.queryBus.execute(new FindPermissionsQuery());

    return permissions
      ? permissions.map(
          (permission) =>
            new PermissionResponseDto(
              permission.id,
              permission.resourceId,
              permission.actionId,
            ),
        )
      : [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PermissionResponseDto> {
    const permission = await this.queryBus.execute(
      new FindOnePermissionQuery(id),
    );

    return new PermissionResponseDto(
      permission.id,
      permission.resourceId,
      permission.actionId,
    );
  }

  @Post()
  async create(
    @Body() createPermission: CreatePermissionDto,
  ): Promise<PermissionResponseDto> {
    try {
      const permission = await this.commandBus.execute(
        new CreatePermissionCommand(
          createPermission.resourceId,
          createPermission.actionId,
        ),
      );

      return new PermissionResponseDto(
        permission.getId(),
        permission.getResourceId(),
        permission.getActionId(),
      );
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.commandBus.execute(new DeletePermissionCommand(id));
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }
}
