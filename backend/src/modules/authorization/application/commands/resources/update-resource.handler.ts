import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateResourceCommand } from './update-resource.command';
import { Inject } from '@nestjs/common';
import {
  type IResourceRepository,
  RESOURCE_REPOSITORY,
} from '../../../domain/repositories/resource.repository.interface';

@CommandHandler(UpdateResourceCommand)
export class UpdateResourceHandler implements ICommandHandler<UpdateResourceCommand> {
  constructor(
    @Inject(RESOURCE_REPOSITORY)
    private readonly repository: IResourceRepository,
  ) {}
  async execute(command: UpdateResourceCommand) {}
}
