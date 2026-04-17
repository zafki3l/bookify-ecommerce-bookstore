import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindResourcesQuery } from './find-resources.query';
import { Inject } from '@nestjs/common';
import {
  type IResourcesQueryRepository,
  RESOURCES_QUERY_REPOSITORY,
} from '../../../domain/repositories/resources/resource-query.repository.interface';

@QueryHandler(FindResourcesQuery)
export class FindResourcesHandler implements IQueryHandler<FindResourcesQuery> {
  constructor(
    @Inject(RESOURCES_QUERY_REPOSITORY)
    private readonly repository: IResourcesQueryRepository,
  ) {}

  async execute(
    query: FindResourcesQuery,
  ): Promise<{ id: string; name: string }[]> {
    return this.repository.find();
  }
}
