import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneResourceQuery } from './find-one-resource.query';
import { Inject } from '@nestjs/common';
import {
  type IResourcesQueryRepository,
  RESOURCES_QUERY_REPOSITORY,
} from '../../../domain/repositories/resources/resources-query.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@QueryHandler(FindOneResourceQuery)
export class FineOneResourceHandler implements IQueryHandler<FindOneResourceQuery> {
  private readonly TTL = 60 * 60 * 1000;

  constructor(
    @Inject(RESOURCES_QUERY_REPOSITORY)
    private readonly repository: IResourcesQueryRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(
    query: FindOneResourceQuery,
  ): Promise<{ id: string; name: string } | null> {
    const cacheKey = `resource:${query.id}`;

    const cached = await this.cache.get<{ id: string; name: string }>(query.id);
    if (cached) return cached;

    const resource = await this.repository.findOne(query.id);

    if (resource) {
      await this.cache.set(cacheKey, resource, this.TTL);
    }

    return resource;
  }
}
