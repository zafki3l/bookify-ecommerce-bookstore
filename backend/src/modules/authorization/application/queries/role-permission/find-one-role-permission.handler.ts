import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneRolePermissionQuery } from './find-one-role-permission.query';
import { Inject } from '@nestjs/common';
import {
  type IRolePermissionQueryRepository,
  ROLE_PERMISSION_QUERY_REPOSITORY,
} from '../../../domain/repositories/permission-role/permission-role-query.repository.interface';

@QueryHandler(FindOneRolePermissionQuery)
export class FindOneRolePermissionHandler implements IQueryHandler<FindOneRolePermissionQuery> {
  constructor(
    @Inject(ROLE_PERMISSION_QUERY_REPOSITORY)
    private readonly repository: IRolePermissionQueryRepository,
  ) {}

  async execute(
    query: FindOneRolePermissionQuery,
  ): Promise<{ roleId: string; permissionId: string } | null> {
    return await this.repository.findOne(query.roleId, query.permissionId);
  }
}
