import { Inject, Injectable } from '@nestjs/common';
import {
  type IRolesCommandRepository,
  ROLES_COMMAND_REPOSITORY,
} from '../../../domain/role-aggregate/repositories/roles-command.repository.interface';
import {
  type IPermissionExistsChecker,
  PERMISSION_EXISTS_CHECKER,
} from '../../../domain/permission-aggregate/services/permission-exists-checker.service.interface';
import { PermissionNotFoundException } from '../../../domain/permission-aggregate/exceptions/permission-not-found.exception';

@Injectable()
export class RevokePermissionUseCase {
  public constructor(
    @Inject(ROLES_COMMAND_REPOSITORY)
    private readonly repository: IRolesCommandRepository,

    @Inject(PERMISSION_EXISTS_CHECKER)
    private readonly permissionExistsChecker: IPermissionExistsChecker,
  ) {}

  public async execute(id: string, permissionId: string): Promise<void> {
    const permissionExistsChecker =
      await this.permissionExistsChecker.isExist(permissionId);
    if (!permissionExistsChecker) {
      throw new PermissionNotFoundException(permissionId);
    }

    const role = await this.repository.findOne(id);

    role.revokePermission(permissionId);

    await this.repository.save(role);
  }
}
