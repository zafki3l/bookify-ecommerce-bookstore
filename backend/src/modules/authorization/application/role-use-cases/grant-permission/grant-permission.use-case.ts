import { Inject, Injectable } from '@nestjs/common';
import {
  type IRolesCommandRepository,
  ROLES_COMMAND_REPOSITORY,
} from '../../../domain/role-aggregate/repositories/roles-command.repository.interface';
import { IGrantPermissionRequest } from './grant-permission.request';
import { PERMISSION_EXISTS_CHECKER } from '../../../domain/permission-aggregate/services/permission-exists-checker.service.interface';
import { PermissionExistsChecker } from '../../../infrastructure/services/permissions/permission-exists-checker.service';
import { PermissionNotFoundException } from '../../../domain/role-aggregate/exceptions/permission-not-found.exception';

@Injectable()
export class GrantPermissionUseCase {
  public constructor(
    @Inject(ROLES_COMMAND_REPOSITORY)
    private readonly repository: IRolesCommandRepository,

    @Inject(PERMISSION_EXISTS_CHECKER)
    private readonly permissionExistsChecker: PermissionExistsChecker,
  ) {}

  public async execute(
    id: string,
    request: IGrantPermissionRequest,
  ): Promise<void> {
    const isPermissionExists = await this.permissionExistsChecker.isExist(
      request.permission,
    );
    if (!isPermissionExists) {
      throw new PermissionNotFoundException(request.permission);
    }

    const role = await this.repository.findOne(id);
    if (!role) {
      return;
    }

    role.grantPermission(request.permission);

    await this.repository.save(role);
  }
}
