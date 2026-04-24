import { Inject, Injectable } from '@nestjs/common';
import {
  type IRolesCommandRepository,
  ROLES_COMMAND_REPOSITORY,
} from '../../../domain/role-aggregate/repositories/roles-command.repository.interface';
import { IGrantPermissionRequest } from './grant-permission.request';

@Injectable()
export class GrantPermissionUseCase {
  public constructor(
    @Inject(ROLES_COMMAND_REPOSITORY)
    private readonly repository: IRolesCommandRepository,
  ) {}

  public async execute(
    id: string,
    request: IGrantPermissionRequest,
  ): Promise<void> {
    const role = await this.repository.findOne(id);

    if (!role) {
      return;
    }

    role.grantPermission(request.permission);

    await this.repository.save(role);
  }
}
