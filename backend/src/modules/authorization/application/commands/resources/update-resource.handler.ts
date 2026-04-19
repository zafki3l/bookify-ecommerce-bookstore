import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateResourceCommand } from './update-resource.command';
import { Inject } from '@nestjs/common';
import {
  type IResourcesCommandRepository,
  RESOURCES_COMMAND_REPOSITORY,
} from '../../../domain/repositories/resources/resources-command.repository.interface';
import { Resource } from '../../../domain/entities/resource.entity';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@CommandHandler(UpdateResourceCommand)
export class UpdateResourceHandler implements ICommandHandler<UpdateResourceCommand> {
  constructor(
    @Inject(RESOURCES_COMMAND_REPOSITORY)
    private readonly repository: IResourcesCommandRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}
  async execute(command: UpdateResourceCommand): Promise<Resource> {
    const resource = await this.repository.findById(command.id);

    resource.updateName(command.name);

    await this.repository.save(resource);
    await this.cache.del(`resource:${resource.getId()}`);

    return resource;
  }
}
