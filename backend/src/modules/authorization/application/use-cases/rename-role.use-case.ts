import { Inject, Injectable } from '@nestjs/common';
import {
  type IRolesCommandRepository,
  ROLES_COMMAND_REPOSITORY,
} from '../../domain/role-aggregate/repositories/roles-command.repository.interface';
import { IRenameRoleRequest } from '../requests/rename-role.request';

@Injectable()
export class RenameRoleUseCase {
  public constructor(
    @Inject(ROLES_COMMAND_REPOSITORY)
    private readonly repository: IRolesCommandRepository,
  ) {}

  public async execute(id: string, request: IRenameRoleRequest): Promise<void> {
    const role = await this.repository.findOne(id);

    role.rename(request.name);

    await this.repository.save(role);
  }
}
