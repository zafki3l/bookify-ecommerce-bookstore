import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateResourceCommand } from './create-resource.command';
import { Inject } from '@nestjs/common';
import { Resource } from '../../../domain/entities/resource.entity';
import {
  type IResourcesCommandRepository,
  RESOURCES_COMMAND_REPOSITORY,
} from '../../../domain/repositories/resources/resource-command.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@CommandHandler(CreateResourceCommand)
export class CreateResourceHandler implements ICommandHandler<CreateResourceCommand> {
  constructor(
    @Inject(RESOURCES_COMMAND_REPOSITORY)
    private readonly repository: IResourcesCommandRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(command: CreateResourceCommand): Promise<Resource> {
    const resource = Resource.create(command.name);

    await this.repository.save(resource);

    await this.cache.del('resources:{}');
    return resource;
  }
}
