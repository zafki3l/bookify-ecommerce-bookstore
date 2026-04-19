import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneActionQuery } from './find-one-action.query';
import { Inject } from '@nestjs/common';
import {
  ACTIONS_QUERY_REPOSITORY,
  type IActionsQueryRepository,
} from '../../../domain/repositories/actions/actions-query.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@QueryHandler(FindOneActionQuery)
export class FindOneActionHandler implements IQueryHandler<FindOneActionQuery> {
  private readonly TTL = 60 * 60 * 1000;

  constructor(
    @Inject(ACTIONS_QUERY_REPOSITORY)
    private readonly repository: IActionsQueryRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(
    query: FindOneActionQuery,
  ): Promise<{ id: string; name: string } | null> {
    const cacheKey = `action:${query.id}`;

    const cached = await this.cache.get<{ id: string; name: string }>(cacheKey);

    if (cached) {
      return cached;
    }

    const action = await this.repository.findOne(query.id);

    if (action) {
      await this.cache.set(cacheKey, action, this.TTL);
    }

    return action;
  }
}
