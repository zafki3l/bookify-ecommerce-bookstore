import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindResourcesQuery } from './find-resources.query';
import { Inject } from '@nestjs/common';
import {
  type IResourceRepository,
  RESOURCE_REPOSITORY,
} from '../../../domain/repositories/resource.repository.interface';
import { Resource } from '../../../domain/entities/resource.entity';

@QueryHandler(FindResourcesQuery)
export class FindResourcesHandler implements IQueryHandler<FindResourcesQuery> {
  constructor(
    @Inject(RESOURCE_REPOSITORY)
    private readonly repository: IResourceRepository,
  ) {}

  async execute(
    query: FindResourcesQuery,
  ): Promise<{ id: string; name: string }[]> {
    return this.repository.find();
  }
}
