import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneRoleQuery } from './find-one-role.query';
import { Inject } from '@nestjs/common';
import {
  type IRolesQueryRepository,
  ROLES_QUERY_REPOSITORY,
} from '../../../domain/repositories/roles/roles-query.repository.interface';

@QueryHandler(FindOneRoleQuery)
export class FindOneRoleHandler implements IQueryHandler<FindOneRoleQuery> {
  constructor(
    @Inject(ROLES_QUERY_REPOSITORY)
    private readonly repository: IRolesQueryRepository,
  ) {}

  async execute(
    query: FindOneRoleQuery,
  ): Promise<{ id: string; name: string } | null> {
    const role = await this.repository.findOne(query.id);

    return role ? role : null;
  }
}
