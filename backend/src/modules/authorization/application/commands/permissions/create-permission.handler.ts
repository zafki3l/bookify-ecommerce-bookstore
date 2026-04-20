import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePermissionCommand } from './create-permission.command';
import { Inject } from '@nestjs/common';
import {
  type IPermissionsCommandRepository,
  PERMISSION_COMMAND_REPOSITORY,
} from '../../../domain/repositories/permissions/permissions-command.repository.interface';
import { Permission } from '../../../domain/entities/permission.entity';
import {
  type IResourceExistsChecker,
  RESOURCE_EXISTS_CHECKER,
} from '../../../domain/services/resources/resource-exists-checker.service';
import { ResourceNotFoundException } from '../../../domain/exceptions/resources/resource-not-found.exception';
import {
  ACTION_EXISTS_CHECKER,
  type IActionExistsChecker,
} from '../../../domain/services/actions/action-exists-checker.service';
import { ActionNotFoundException } from '../../../domain/exceptions/actions/action-not-found.exception';
import {
  type IPermissionExistsChecker,
  PERMISSION_EXISTS_CHECKER,
} from '../../../domain/services/permissions/permission-exists-checker.service';
import { PermissionExistsException } from '../../../domain/exceptions/permissions/permission-exists.exception';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler implements ICommandHandler<CreatePermissionCommand> {
  constructor(
    @Inject(PERMISSION_COMMAND_REPOSITORY)
    private readonly repository: IPermissionsCommandRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,

    @Inject(RESOURCE_EXISTS_CHECKER)
    private readonly resourceExistsChecker: IResourceExistsChecker,

    @Inject(ACTION_EXISTS_CHECKER)
    private readonly actionExistsChecker: IActionExistsChecker,

    @Inject(PERMISSION_EXISTS_CHECKER)
    private readonly permissionExistsChecker: IPermissionExistsChecker,
  ) {}

  async execute(command: CreatePermissionCommand): Promise<Permission> {
    const resourceId = command.resourceId;
    const actionId = command.actionId;
    const id = `${resourceId}.${actionId}`;

    const isResourceExists =
      await this.resourceExistsChecker.isExist(resourceId);
    if (!isResourceExists) {
      throw new ResourceNotFoundException(resourceId);
    }

    const isActionExists = await this.actionExistsChecker.isExist(actionId);
    if (!isActionExists) {
      throw new ActionNotFoundException(actionId);
    }

    const isExists = await this.permissionExistsChecker.isExist(id);
    if (isExists) {
      throw new PermissionExistsException(id);
    }

    const permission = Permission.create(id, resourceId, actionId);

    await this.repository.save(permission);
    await this.cache.del('permissions{}');

    return permission;
  }
}
