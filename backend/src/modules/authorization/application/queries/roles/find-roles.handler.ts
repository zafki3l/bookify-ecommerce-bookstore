import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRolesQuery } from './find-roles.query';
import { Inject } from '@nestjs/common';
import {
  type IRolesQueryRepository,
  ROLES_QUERY_REPOSITORY,
} from '../../../domain/repositories/roles/roles-query.repository.interface';

@QueryHandler(FindRolesQuery)
export class FindRolesHandler implements IQueryHandler<FindRolesQuery> {
  constructor(
    @Inject(ROLES_QUERY_REPOSITORY)
    private readonly repository: IRolesQueryRepository,
  ) {}

  async execute(
    query: FindRolesQuery,
  ): Promise<{ id: string; name: string }[]> {
    const roles = await this.repository.find();

    return roles;
  }
}
