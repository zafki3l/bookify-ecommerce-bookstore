import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRolePermissionCommand } from './create-role-permission.command';
import { Inject } from '@nestjs/common';
import {
  type IRolePermissionCommandRepository,
  ROLE_PERMISSION_COMMAND_REPOSITORY,
} from '../../../domain/repositories/role-permission/role-permission-command.repository.interface';
import { RolePermission } from '../../../domain/entities/role-permission.entity';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';
import {
  type IRoleExistsChecker,
  ROLE_EXISTS_CHECKER,
} from '../../../domain/services/roles/role-exists-checker.service';
import {
  type IPermissionExistsChecker,
  PERMISSION_EXISTS_CHECKER,
} from '../../../domain/services/permissions/permission-exists-checker.service';
import { RoleNotFoundException } from '../../../domain/exceptions/roles/role-not-found.exception';
import { PermissionNotFoundException } from '../../../domain/exceptions/permissions/permission-not-found.exception';

@CommandHandler(CreateRolePermissionCommand)
export class CreateRolePermissionHandler implements ICommandHandler<CreateRolePermissionCommand> {
  constructor(
    @Inject(ROLE_PERMISSION_COMMAND_REPOSITORY)
    private readonly repository: IRolePermissionCommandRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,

    @Inject(ROLE_EXISTS_CHECKER)
    private readonly roleExistsChecker: IRoleExistsChecker,

    @Inject(PERMISSION_EXISTS_CHECKER)
    private readonly permissionExistsChecker: IPermissionExistsChecker,
  ) {}

  async execute(command: CreateRolePermissionCommand): Promise<RolePermission> {
    const isRoleExists = await this.roleExistsChecker.isExist(command.roleId);
    if (!isRoleExists) {
      throw new RoleNotFoundException(command.roleId);
    }

    const isPermissionExists = await this.permissionExistsChecker.isExist(
      command.permissionId,
    );
    if (!isPermissionExists) {
      throw new PermissionNotFoundException(command.permissionId);
    }

    const rolePermission = RolePermission.create(
      command.roleId,
      command.permissionId,
    );

    await this.repository.save(rolePermission);
    await this.cache.del('rolePermissions:{}');

    return rolePermission;
  }
}
