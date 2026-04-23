import { Inject } from '@nestjs/common';
import { IRoleExistsChecker } from '../../../domain/role-aggregate/services/role-exists-checker.service.interface';
import {
  type IRolesQueryRepository,
  ROLES_QUERY_REPOSITORY,
} from '../../../domain/role-aggregate/repositories/roles-query.repository.interface';

export class RoleExistsChecker implements IRoleExistsChecker {
  public constructor(
    @Inject(ROLES_QUERY_REPOSITORY)
    private readonly repository: IRolesQueryRepository,
  ) {}

  public async isExist(id: string): Promise<boolean> {
    const role = await this.repository.findOne(id);

    return !!role;
  }
}
