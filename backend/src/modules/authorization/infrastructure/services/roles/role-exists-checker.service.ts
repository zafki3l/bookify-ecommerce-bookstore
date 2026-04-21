import { Inject, Injectable } from '@nestjs/common';
import { IRoleExistsChecker } from '../../../domain/services/roles/role-exists-checker.service';
import {
  type IRolesQueryRepository,
  ROLES_QUERY_REPOSITORY,
} from '../../../domain/repositories/roles/roles-query.repository.interface';

@Injectable()
export class RoleExistsChecker implements IRoleExistsChecker {
  constructor(
    @Inject(ROLES_QUERY_REPOSITORY)
    private readonly repository: IRolesQueryRepository,
  ) {}

  async isExist(id: string): Promise<boolean> {
    const role = await this.repository.findOne(id);

    return role ? true : false;
  }
}
