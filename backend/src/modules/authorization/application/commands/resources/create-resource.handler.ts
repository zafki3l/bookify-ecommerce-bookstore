import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateResourceCommand } from './create-resource.command';
import { Inject } from '@nestjs/common';
import { Resource } from '../../../domain/entities/resource.entity';
import {
  type IResourcesCommandRepository,
  RESOURCES_COMMAND_REPOSITORY,
} from '../../../domain/repositories/resources/resources-command.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';
import {
  type IResourceExistsChecker,
  RESOURCE_EXISTS_CHECKER,
} from '../../../domain/services/resources/resource-exists-checker.service';
import { ResourceExistsException } from '../../../domain/exceptions/resources/resource-exists.exception';

@CommandHandler(CreateResourceCommand)
export class CreateResourceHandler implements ICommandHandler<CreateResourceCommand> {
  constructor(
    @Inject(RESOURCES_COMMAND_REPOSITORY)
    private readonly repository: IResourcesCommandRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,

    @Inject(RESOURCE_EXISTS_CHECKER)
    private readonly resourceExistsChecker: IResourceExistsChecker,
  ) {}

  async execute(command: CreateResourceCommand): Promise<Resource> {
    const resource = Resource.create(command.name);

    const isExist = await this.resourceExistsChecker.isExist(resource.getId());
    if (isExist) {
      throw new ResourceExistsException(resource.getId());
    }

    await this.repository.save(resource);
    await this.cache.del('resources:{}');

    return resource;
  }
}
