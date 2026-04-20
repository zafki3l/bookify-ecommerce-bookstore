import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from './create-permission.command';
import { Inject } from '@nestjs/common';
import {
  type IPermissionsCommandRepository,
  PERMISSION_COMMAND_REPOSITORY,
} from '../../../domain/repositories/permissions/permissions-command.repository.interface';
import { Permission } from '../../../domain/entities/permission.entity';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler implements ICommandHandler<CreatePermissionCommand> {
  constructor(
    @Inject(PERMISSION_COMMAND_REPOSITORY)
    private readonly repository: IPermissionsCommandRepository,
  ) {}

  async execute(command: CreatePermissionCommand): Promise<Permission> {
    const permission = Permission.create(command.resourceId, command.actionId);

    await this.repository.save(permission);

    return permission;
  }
}
