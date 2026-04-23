import { Inject, Injectable } from '@nestjs/common';
import {
  type IRolesQueryRepository,
  ROLES_QUERY_REPOSITORY,
} from '../../domain/role-aggregate/repositories/roles-query.repository.interface';
import { FindOneRoleResponse } from '../responses/find-one-role.response';

@Injectable()
export class FindOneRoleUseCase {
  public constructor(
    @Inject(ROLES_QUERY_REPOSITORY)
    private readonly repository: IRolesQueryRepository,
  ) {}

  public async execute(id: string): Promise<FindOneRoleResponse | null> {
    const role = await this.repository.findOne(id);

    if (!role) {
      return null;
    }

    return new FindOneRoleResponse(role.id, role.name, role.permissions);
  }
}
