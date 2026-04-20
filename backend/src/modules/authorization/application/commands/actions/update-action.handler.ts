import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateActionCommand } from './update-action.command';
import { Action } from '../../../domain/entities/action.entity';
import { Inject } from '@nestjs/common';
import {
  ACTIONS_COMMAND_REPOSITORY,
  type IActionsCommandRepository,
} from '../../../domain/repositories/actions/actions-command.repository.interface';

@CommandHandler(UpdateActionCommand)
export class UpdateActionHandler implements ICommandHandler<UpdateActionCommand> {
  constructor(
    @Inject(ACTIONS_COMMAND_REPOSITORY)
    private readonly repository: IActionsCommandRepository,
  ) {}

  async execute(command: UpdateActionCommand): Promise<Action> {
    const action = await this.repository.findById(command.id);

    action.updateName(command.name);

    await this.repository.save(action);

    return action;
  }
}
