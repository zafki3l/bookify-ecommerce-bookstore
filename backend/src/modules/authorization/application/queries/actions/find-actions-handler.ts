import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindActionsQuery } from './find-actions-query';
import { Inject } from '@nestjs/common';
import {
  ACTIONS_QUERY_REPOSITORY,
  type IActionsQueryRepository,
} from '../../../domain/repositories/actions/actions-query.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@QueryHandler(FindActionsQuery)
export class FindActionsHandler implements IQueryHandler<FindActionsQuery> {
  private readonly TTL = 60 * 60 * 1000;

  constructor(
    @Inject(ACTIONS_QUERY_REPOSITORY)
    private readonly repository: IActionsQueryRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(
    query: FindActionsQuery,
  ): Promise<{ id: string; name: string }[]> {
    const cacheKey = `actions:${JSON.stringify(query)}`;

    const cached =
      await this.cache.get<{ id: string; name: string }[]>(cacheKey);

    if (cached) {
      return cached;
    }

    const actions = await this.repository.find();
    await this.cache.set(cacheKey, actions, this.TTL);

    return actions;
  }
}
