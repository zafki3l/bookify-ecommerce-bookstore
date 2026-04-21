import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRolesQuery } from './find-roles.query';
import { Inject } from '@nestjs/common';
import {
  type IRolesQueryRepository,
  ROLES_QUERY_REPOSITORY,
} from '../../../domain/repositories/roles/roles-query.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@QueryHandler(FindRolesQuery)
export class FindRolesHandler implements IQueryHandler<FindRolesQuery> {
  private readonly TTL = 60 * 60 * 1000;

  constructor(
    @Inject(ROLES_QUERY_REPOSITORY)
    private readonly repository: IRolesQueryRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(
    query: FindRolesQuery,
  ): Promise<{ id: string; name: string }[]> {
    const cacheKey = `roles:${JSON.stringify(query)}`;

    const cached =
      await this.cache.get<{ id: string; name: string }[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const roles = await this.repository.find();
    if (roles) {
      await this.cache.set(cacheKey, roles, this.TTL);
    }

    return roles;
  }
}
