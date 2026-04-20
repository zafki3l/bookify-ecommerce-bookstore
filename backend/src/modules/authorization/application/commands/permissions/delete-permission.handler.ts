import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePermissionCommand } from './delete-permission.command';
import { Inject } from '@nestjs/common';
import {
  type IPermissionsCommandRepository,
  PERMISSION_COMMAND_REPOSITORY,
} from '../../../domain/repositories/permissions/permissions-command.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@CommandHandler(DeletePermissionCommand)
export class DeletePermissionHandler implements ICommandHandler<DeletePermissionCommand> {
  constructor(
    @Inject(PERMISSION_COMMAND_REPOSITORY)
    private readonly repository: IPermissionsCommandRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(command: DeletePermissionCommand): Promise<void> {
    const permission = await this.repository.findById(command.id);

    if (permission) {
      await this.repository.delete(permission);
      await this.cache.del(`permission:${command.id}`);
    }
  }
}
