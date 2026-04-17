import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateResourceCommand } from './create-resource.command';
import {
  RESOURCE_REPOSITORY,
  type IResourceRepository,
} from '../../../domain/repositories/resource.repository.interface';
import { Inject } from '@nestjs/common';
import { Resource } from '../../../domain/entities/resource.entity';

@CommandHandler(CreateResourceCommand)
export class CreateResourceHandler implements ICommandHandler<CreateResourceCommand> {
  constructor(
    @Inject(RESOURCE_REPOSITORY)
    private readonly repository: IResourceRepository,
  ) {}

  async execute(command: CreateResourceCommand): Promise<Resource> {
    const resource = Resource.create(command.id, command.name);

    await this.repository.save(resource);

    return resource;
  }
}
