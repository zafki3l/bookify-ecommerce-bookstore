import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteActionCommand } from './delete-action.command';
import { Inject } from '@nestjs/common';
import {
  ACTIONS_COMMAND_REPOSITORY,
  type IActionsCommandRepository,
} from '../../../domain/repositories/actions/actions-command.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@CommandHandler(DeleteActionCommand)
export class DeleteActionHandler implements ICommandHandler<DeleteActionCommand> {
  constructor(
    @Inject(ACTIONS_COMMAND_REPOSITORY)
    private readonly repository: IActionsCommandRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(command: DeleteActionCommand): Promise<void> {
    const action = await this.repository.findById(command.id);

    if (action) {
      await this.repository.delete(action);
      await this.cache.del('actions:{}');
      await this.cache.del(`action:${command.id}`);
    }
  }
}
