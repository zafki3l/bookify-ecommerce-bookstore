import { Inject, Injectable } from '@nestjs/common';
import { ICreatePermissionRequest } from './create-permission.request';
import {
  type IPermissionsCommandRepository,
  PERMISSIONS_COMMAND_REPOSITORY,
} from '../../../domain/permission-aggregate/repositories/permission-command.repository.interface';
import { Permission } from '../../../domain/permission-aggregate/permission.aggregate';
import { PERMISSION_EXISTS_CHECKER } from '../../../domain/permission-aggregate/services/permission-exists-checker.service.interface';
import { PermissionExistsChecker } from '../../../infrastructure/services/permissions/permission-exists-checker.service';
import { PermissionAlreadyExistsException } from '../../../domain/permission-aggregate/exceptions/permission-already-exists.exception';

@Injectable()
export class CreatePermissionUseCase {
  public constructor(
    @Inject(PERMISSIONS_COMMAND_REPOSITORY)
    private readonly repository: IPermissionsCommandRepository,

    @Inject(PERMISSION_EXISTS_CHECKER)
    private readonly permissionExistsChecker: PermissionExistsChecker,
  ) {}

  public async execute(request: ICreatePermissionRequest) {
    const permission = Permission.create(request.resource, request.action);

    const isExists = await this.permissionExistsChecker.isExist(
      permission.getId(),
    );
    if (isExists) {
      throw new PermissionAlreadyExistsException(permission.getId());
    }

    await this.repository.save(permission);
  }
}
