import { Inject, Injectable } from '@nestjs/common';
import { IPermissionExistsChecker } from '../../../domain/services/permissions/permission-exists-checker.service';
import {
  type IPermissionsQueryRepository,
  PERMISSIONS_QUERY_REPOSITORY,
} from '../../../domain/repositories/permissions/permissions-query.repository.interface';

@Injectable()
export class PermissionExistsChecker implements IPermissionExistsChecker {
  constructor(
    @Inject(PERMISSIONS_QUERY_REPOSITORY)
    private readonly repository: IPermissionsQueryRepository,
  ) {}

  async isExist(id: string): Promise<boolean> {
    const permission = await this.repository.findOne(id);

    return permission ? true : false;
  }
}
