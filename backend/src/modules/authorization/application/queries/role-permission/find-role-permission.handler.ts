import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRolePermissionQuery } from './find-role-permission.query';
import { Inject } from '@nestjs/common';
import {
  type IRolePermissionQueryRepository,
  ROLE_PERMISSION_QUERY_REPOSITORY,
} from '../../../domain/repositories/role-permission/role-permission-query.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@QueryHandler(FindRolePermissionQuery)
export class FindRolePermissionHandler implements IQueryHandler<FindRolePermissionQuery> {
  private readonly TTL = 60 * 60 * 1000;

  constructor(
    @Inject(ROLE_PERMISSION_QUERY_REPOSITORY)
    private readonly repository: IRolePermissionQueryRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(
    query: FindRolePermissionQuery,
  ): Promise<{ roleId: string; permissionId: string }[]> {
    const cacheKey = `rolePermissions:${JSON.stringify(query)}`;

    const cached =
      await this.cache.get<{ roleId: string; permissionId: string }[]>(
        cacheKey,
      );
    if (cached) {
      return cached;
    }

    const rolePermissions = await this.repository.find();
    if (rolePermissions) {
      this.cache.set(cacheKey, rolePermissions, this.TTL);
    }

    return rolePermissions;
  }
}
