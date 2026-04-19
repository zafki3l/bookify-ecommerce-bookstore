import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateActionCommand } from './create-action.command';

@CommandHandler(CreateActionCommand)
export class CreateActionHandler implements ICommandHandler<CreateActionCommand> {
  async execute(command: CreateActionCommand) {}
}
