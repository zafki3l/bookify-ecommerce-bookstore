import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPermissionsQuery } from './find-permissions.query';
import { Inject } from '@nestjs/common';
import {
  type IPermissionQueryRepository,
  PERMISSIONS_QUERY_REPOSITORY,
} from '../../../domain/repositories/permissions/permissions-query.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@QueryHandler(FindPermissionsQuery)
export class FindPermissionsHandler implements IQueryHandler<FindPermissionsQuery> {
  private readonly TTL = 60 * 60 * 1000;

  constructor(
    @Inject(PERMISSIONS_QUERY_REPOSITORY)
    private readonly repository: IPermissionQueryRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}
  async execute(
    query: FindPermissionsQuery,
  ): Promise<{ id: string; resourceId: string; actionId: string }[]> {
    const cacheKey = `permissions:${JSON.stringify(query)}`;

    const cached =
      await this.cache.get<
        { id: string; resourceId: string; actionId: string }[]
      >(cacheKey);
    if (cached) {
      return cached;
    }

    const permissions = await this.repository.find();
    if (permissions) {
      await this.cache.set(cacheKey, permissions, this.TTL);
    }

    return permissions;
  }
}
