import { Inject, Injectable } from '@nestjs/common';
import {
  type IRolesCommandRepository,
  ROLES_COMMAND_REPOSITORY,
} from '../../../domain/role-aggregate/repositories/roles-command.repository.interface';
import { IGrantPermissionRequest } from './grant-permission.request';
import {
  type IPermissionExistsChecker,
  PERMISSION_EXISTS_CHECKER,
} from '../../../domain/permission-aggregate/services/permission-exists-checker.service.interface';
import { PermissionNotFoundException } from '../../../domain/permission-aggregate/exceptions/permission-not-found.exception';

@Injectable()
export class GrantPermissionUseCase {
  public constructor(
    @Inject(ROLES_COMMAND_REPOSITORY)
    private readonly repository: IRolesCommandRepository,

    @Inject(PERMISSION_EXISTS_CHECKER)
    private readonly permissionExistsChecker: IPermissionExistsChecker,
  ) {}

  public async execute(
    id: string,
    request: IGrantPermissionRequest,
  ): Promise<void> {
    const isPermissionExists = await this.permissionExistsChecker.isExist(
      request.permissionId,
    );
    if (!isPermissionExists) {
      throw new PermissionNotFoundException(request.permissionId);
    }

    const role = await this.repository.findOne(id);
    if (!role) {
      return;
    }

    role.grantPermission(request.permissionId);

    await this.repository.save(role);
  }
}
