import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOnePermissionQuery } from './find-one-permission.query';
import { Inject } from '@nestjs/common';
import {
  type IPermissionQueryRepository,
  PERMISSIONS_QUERY_REPOSITORY,
} from '../../../domain/repositories/permissions/permissions-query.repository.interface';

@QueryHandler(FindOnePermissionQuery)
export class FindOnePermissionHandler implements IQueryHandler<FindOnePermissionQuery> {
  constructor(
    @Inject(PERMISSIONS_QUERY_REPOSITORY)
    private readonly repository: IPermissionQueryRepository,
  ) {}
  async execute(
    query: FindOnePermissionQuery,
  ): Promise<{ id: string; resourceId: string; actionId: string } | null> {
    return await this.repository.findOne(query.id);
  }
}
