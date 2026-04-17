import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteResourceCommand } from './delete-resource.command';
import { Inject } from '@nestjs/common';
import {
  type IResourcesCommandRepository,
  RESOURCES_COMMAND_REPOSITORY,
} from '../../../domain/repositories/resources/resource-command.repository.interface';

@CommandHandler(DeleteResourceCommand)
export class DeleteResourceHandler implements ICommandHandler<DeleteResourceCommand> {
  constructor(
    @Inject(RESOURCES_COMMAND_REPOSITORY)
    private readonly repository: IResourcesCommandRepository,
  ) {}
  async execute(command: DeleteResourceCommand): Promise<void> {
    const resource = await this.repository.findById(command.id);

    await this.repository.delete(resource);
  }
}
