import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneResourceQuery } from './find-one-resource.query';
import { Inject } from '@nestjs/common';
import {
  type IResourcesQueryRepository,
  RESOURCES_QUERY_REPOSITORY,
} from '../../../domain/repositories/resources/resource-query.repository.interface';

@QueryHandler(FindOneResourceQuery)
export class FineOneResourceHandler implements IQueryHandler<FindOneResourceQuery> {
  constructor(
    @Inject(RESOURCES_QUERY_REPOSITORY)
    private readonly repository: IResourcesQueryRepository,
  ) {}

  async execute(
    query: FindOneResourceQuery,
  ): Promise<{ id: string; name: string } | null> {
    return await this.repository.findOne(query.id);
  }
}
