import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRolePermissionCommand } from './delete-role-permission.command';
import { Inject } from '@nestjs/common';
import {
  type IRolePermissionCommandRepository,
  ROLE_PERMISSION_COMMAND_REPOSITORY,
} from '../../../domain/repositories/role-permission/role-permission-command.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@CommandHandler(DeleteRolePermissionCommand)
export class DeleteRolePermissionHandler implements ICommandHandler<DeleteRolePermissionCommand> {
  constructor(
    @Inject(ROLE_PERMISSION_COMMAND_REPOSITORY)
    private readonly repository: IRolePermissionCommandRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(command: DeleteRolePermissionCommand): Promise<void> {
    const rolePermission = await this.repository.findOne(
      command.roleId,
      command.permissionId,
    );

    await this.repository.delete(rolePermission);
    await this.cache.del(
      `rolePermission:${command.roleId}&${command.permissionId}`,
    );
    await this.cache.del('rolePermissions:{}');
  }
}
