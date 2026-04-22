import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneRolePermissionQuery } from './find-one-role-permission.query';
import { Inject } from '@nestjs/common';
import {
  type IRolePermissionQueryRepository,
  ROLE_PERMISSION_QUERY_REPOSITORY,
} from '../../../domain/repositories/role-permission/role-permission-query.repository.interface';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@QueryHandler(FindOneRolePermissionQuery)
export class FindOneRolePermissionHandler implements IQueryHandler<FindOneRolePermissionQuery> {
  private readonly TTL = 60 * 60 * 1000;

  constructor(
    @Inject(ROLE_PERMISSION_QUERY_REPOSITORY)
    private readonly repository: IRolePermissionQueryRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,
  ) {}

  async execute(
    query: FindOneRolePermissionQuery,
  ): Promise<{ roleId: string; permissionId: string } | null> {
    const cacheKey = `rolePermission:${query.roleId}&${query.permissionId}`;

    const cached = await this.cache.get<{
      roleId: string;
      permissionId: string;
    }>(cacheKey);
    if (cached) {
      return cached;
    }

    const rolePermission = await this.repository.findOne(
      query.roleId,
      query.permissionId,
    );
    if (rolePermission) {
      await this.cache.set(cacheKey, rolePermission, this.TTL);
    }

    return rolePermission;
  }
}
