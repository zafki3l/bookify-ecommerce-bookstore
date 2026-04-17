import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateResourceCommand } from './create-resource.command';
import { Inject } from '@nestjs/common';
import { Resource } from '../../../domain/entities/resource.entity';
import {
  type IResourcesCommandRepository,
  RESOURCES_COMMAND_REPOSITORY,
} from '../../../domain/repositories/resources/resource-command.repository.interface';

@CommandHandler(CreateResourceCommand)
export class CreateResourceHandler implements ICommandHandler<CreateResourceCommand> {
  constructor(
    @Inject(RESOURCES_COMMAND_REPOSITORY)
    private readonly repository: IResourcesCommandRepository,
  ) {}

  async execute(command: CreateResourceCommand): Promise<Resource> {
    const resource = Resource.create(command.id, command.name);

    await this.repository.save(resource);

    return resource;
  }
}
