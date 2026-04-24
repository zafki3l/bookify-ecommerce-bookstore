import { Inject, Injectable } from '@nestjs/common';
import { IPermissionExistsChecker } from '../../../domain/permission-aggregate/services/permission-exists-checker.service.interface';
import {
  type IPermissionsQueryRepository,
  PERMISSIONS_QUERY_REPOSITORY,
} from '../../../domain/permission-aggregate/repositories/permission-query.repository.interface';

@Injectable()
export class PermissionExistsChecker implements IPermissionExistsChecker {
  public constructor(
    @Inject(PERMISSIONS_QUERY_REPOSITORY)
    private readonly repository: IPermissionsQueryRepository,
  ) {}

  public async isExist(id: string): Promise<boolean> {
    const permission = await this.repository.findOne(id);

    return !!permission;
  }
}
