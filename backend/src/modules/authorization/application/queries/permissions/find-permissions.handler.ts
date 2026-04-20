import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPermissionsQuery } from './find-permissions.query';
import { Inject } from '@nestjs/common';
import {
  type IPermissionQueryRepository,
  PERMISSIONS_QUERY_REPOSITORY,
} from '../../../domain/repositories/permissions/permissions-query.repository.interface';

@QueryHandler(FindPermissionsQuery)
export class FindPermissionsHandler implements IQueryHandler<FindPermissionsQuery> {
  constructor(
    @Inject(PERMISSIONS_QUERY_REPOSITORY)
    private readonly repository: IPermissionQueryRepository,
  ) {}
  async execute(
    query: FindPermissionsQuery,
  ): Promise<{ id: string; resourceId: string; actionId: string }[]> {
    const permissions = await this.repository.find();

    return permissions;
  }
}
