import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRolePermissionCommand } from './create-role-permission.command';
import { Inject } from '@nestjs/common';
import {
  type IRolePermissionCommandRepository,
  ROLE_PERMISSION_COMMAND_REPOSITORY,
} from '../../../domain/repositories/role-permission/role-permission-command.repository.interface';
import { RolePermission } from '../../../domain/entities/role-permission.entity';

@CommandHandler(CreateRolePermissionCommand)
export class CreateRolePermissionHandler implements ICommandHandler<CreateRolePermissionCommand> {
  constructor(
    @Inject(ROLE_PERMISSION_COMMAND_REPOSITORY)
    private readonly repository: IRolePermissionCommandRepository,
  ) {}

  async execute(command: CreateRolePermissionCommand): Promise<RolePermission> {
    const rolePermission = RolePermission.create(
      command.roleId,
      command.permissionId,
    );

    await this.repository.save(rolePermission);

    return rolePermission;
  }
}
