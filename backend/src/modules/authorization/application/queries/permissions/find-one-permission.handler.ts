import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOnePermissionQuery } from './find-one-permission.query';
import { Inject } from '@nestjs/common';
import {
  type IPermissionQueryRepository,
  PERMISSIONS_QUERY_REPOSITORY,
} from '../../../domain/repositories/permissions/permissions-query.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@QueryHandler(FindOnePermissionQuery)
export class FindOnePermissionHandler implements IQueryHandler<FindOnePermissionQuery> {
  private readonly TTL = 60 * 60 * 1000;

  constructor(
    @Inject(PERMISSIONS_QUERY_REPOSITORY)
    private readonly repository: IPermissionQueryRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}
  async execute(
    query: FindOnePermissionQuery,
  ): Promise<{ id: string; resourceId: string; actionId: string } | null> {
    const cacheKey = `permission:${query.id}`;

    const cached = await this.cache.get<{
      id: string;
      resourceId: string;
      actionId: string;
    } | null>(cacheKey);
    if (cached) {
      return cached;
    }

    const permission = await this.repository.findOne(query.id);

    if (permission) {
      await this.cache.set(cacheKey, permission, this.TTL);
    }

    return permission;
  }
}
