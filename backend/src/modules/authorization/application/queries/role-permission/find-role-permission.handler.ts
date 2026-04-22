import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRolePermissionQuery } from './find-role-permission.query';
import { Inject } from '@nestjs/common';
import {
  type IRolePermissionQueryRepository,
  ROLE_PERMISSION_QUERY_REPOSITORY,
} from '../../../domain/repositories/role-permission/role-permission-query.repository.interface';

@QueryHandler(FindRolePermissionQuery)
export class FindRolePermissionHandler implements IQueryHandler<FindRolePermissionQuery> {
  constructor(
    @Inject(ROLE_PERMISSION_QUERY_REPOSITORY)
    private readonly repository: IRolePermissionQueryRepository,
  ) {}

  async execute(
    query: FindRolePermissionQuery,
  ): Promise<{ roleId: string; permissionId: string }[]> {
    return await this.repository.find();
  }
}
