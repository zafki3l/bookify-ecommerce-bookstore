import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindResourcesQuery } from './find-resources.query';
import { Inject } from '@nestjs/common';
import {
  type IResourcesQueryRepository,
  RESOURCES_QUERY_REPOSITORY,
} from '../../../domain/repositories/resources/resource-query.repository.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';

@QueryHandler(FindResourcesQuery)
export class FindResourcesHandler implements IQueryHandler<FindResourcesQuery> {
  private readonly TTL = 60 * 1000;

  constructor(
    @Inject(RESOURCES_QUERY_REPOSITORY)
    private readonly repository: IResourcesQueryRepository,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {}

  async execute(
    query: FindResourcesQuery,
  ): Promise<{ id: string; name: string }[]> {
    const cacheKey = `resources:${JSON.stringify(query)}`;

    const cached =
      await this.cache.get<{ id: string; name: string }[]>(cacheKey);
    if (cached) return cached;

    const resources = await this.repository.find();
    await this.cache.set(cacheKey, resources, this.TTL);

    return resources;
  }
}
