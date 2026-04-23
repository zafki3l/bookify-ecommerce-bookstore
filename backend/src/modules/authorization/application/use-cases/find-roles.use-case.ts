import { Inject, Injectable } from '@nestjs/common';
import {
  type IRolesQueryRepository,
  ROLES_QUERY_REPOSITORY,
} from '../../domain/role-aggregate/repositories/roles-query.repository.interface';
import { FindRolesResponse } from '../responses/find-roles.response';

@Injectable()
export class FindRolesUseCase {
  public constructor(
    @Inject(ROLES_QUERY_REPOSITORY)
    private readonly repository: IRolesQueryRepository,
  ) {}

  public async execute(): Promise<FindRolesResponse[]> {
    const roles = await this.repository.findAll();

    return roles.map(
      (role) => new FindRolesResponse(role.id, role.name, role.permissions),
    );
  }
}
