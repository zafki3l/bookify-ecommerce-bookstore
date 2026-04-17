import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateResourceCommand } from './create-resource.command';
import {
  RESOURCE_REPOSITORY,
  type IResourceRepository,
} from '../../../domain/repositories/resource.repository.interface';
import { Inject } from '@nestjs/common';
import { Resource } from '../../../infrastructure/entities/resource.entity';

@CommandHandler(CreateResourceCommand)
export class CreateResourceHandler implements ICommandHandler<CreateResourceCommand> {
  constructor(
    @Inject(RESOURCE_REPOSITORY)
    private readonly repository: IResourceRepository,
  ) {}

  async execute(command: CreateResourceCommand) {
    const resource = new Resource();
    resource.id = command.id;
    resource.name = command.name;
    await this.repository.save(resource);

    return resource;
  }
}
