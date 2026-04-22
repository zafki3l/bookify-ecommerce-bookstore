import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRolePermissionCommand } from './delete-role-permission.command';
import { Inject } from '@nestjs/common';
import {
  type IRolePermissionCommandRepository,
  ROLE_PERMISSION_COMMAND_REPOSITORY,
} from '../../../domain/repositories/role-permission/role-permission-command.repository.interface';

@CommandHandler(DeleteRolePermissionCommand)
export class DeleteRolePermissionHandler implements ICommandHandler<DeleteRolePermissionCommand> {
  constructor(
    @Inject(ROLE_PERMISSION_COMMAND_REPOSITORY)
    private readonly repository: IRolePermissionCommandRepository,
  ) {}

  async execute(command: DeleteRolePermissionCommand): Promise<void> {
    const rolePermission = await this.repository.findOne(
      command.roleId,
      command.permissionId,
    );

    await this.repository.delete(rolePermission);
  }
}
