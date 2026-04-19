import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindResourcesQuery } from './find-resources.query';
import { Inject } from '@nestjs/common';
import {
  type IResourcesQueryRepository,
  RESOURCES_QUERY_REPOSITORY,
} from '../../../domain/repositories/resources/resources-query.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@QueryHandler(FindResourcesQuery)
export class FindResourcesHandler implements IQueryHandler<FindResourcesQuery> {
  private readonly TTL = 60 * 60 * 1000;

  constructor(
    @Inject(RESOURCES_QUERY_REPOSITORY)
    private readonly repository: IResourcesQueryRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(
    query: FindResourcesQuery,
  ): Promise<{ id: string; name: string }[]> {
    const cacheKey = `resources:${JSON.stringify(query)}`;

    const cached =
      await this.cache.get<{ id: string; name: string }[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const resources = await this.repository.find();
    await this.cache.set(cacheKey, resources, this.TTL);

    return resources;
  }
}
