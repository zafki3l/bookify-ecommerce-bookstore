import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneRoleQuery } from './find-one-role.query';
import { Inject } from '@nestjs/common';
import {
  type IRolesQueryRepository,
  ROLES_QUERY_REPOSITORY,
} from '../../../domain/repositories/roles/roles-query.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@QueryHandler(FindOneRoleQuery)
export class FindOneRoleHandler implements IQueryHandler<FindOneRoleQuery> {
  private readonly TTL = 60 * 60 * 1000;

  constructor(
    @Inject(ROLES_QUERY_REPOSITORY)
    private readonly repository: IRolesQueryRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(
    query: FindOneRoleQuery,
  ): Promise<{ id: string; name: string } | null> {
    const cacheKey = `role:${query.id}`;

    const cached = await this.cache.get<{ id: string; name: string }>(cacheKey);
    if (cached) {
      return cached;
    }

    const role = await this.repository.findOne(query.id);
    if (role) {
      await this.cache.set(cacheKey, role, this.TTL);
    }

    return role;
  }
}
