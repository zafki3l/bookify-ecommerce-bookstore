import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateActionCommand } from './create-action.command';
import { Action } from '../../../domain/entities/action.entity';
import { Inject } from '@nestjs/common';
import {
  ACTION_EXISTS_CHECKER,
  type IActionExistsChecker,
} from '../../../domain/services/actions/action-exists-checker.service';
import { ActionExistsException } from '../../../domain/exceptions/actions/action-exists.exception';
import {
  ACTIONS_COMMAND_REPOSITORY,
  type IActionsCommandRepository,
} from '../../../domain/repositories/actions/actions-command.repository.interface';

@CommandHandler(CreateActionCommand)
export class CreateActionHandler implements ICommandHandler<CreateActionCommand> {
  constructor(
    @Inject(ACTIONS_COMMAND_REPOSITORY)
    private readonly repository: IActionsCommandRepository,

    @Inject(ACTION_EXISTS_CHECKER)
    private readonly actionExistsChecker: IActionExistsChecker,
  ) {}

  async execute(command: CreateActionCommand) {
    const action = Action.create(command.name);

    const isExist = await this.actionExistsChecker.isExist(action.getId());
    if (isExist) {
      throw new ActionExistsException(action.getId());
    }

    await this.repository.save(action);

    return action;
  }
}
