import { Inject, Injectable } from '@nestjs/common';
import { ICreateRoleRequest } from '../requests/create-role.request';
import {
  type IRolesCommandRepository,
  ROLES_COMMAND_REPOSITORY,
} from '../../domain/role-aggregate/repositories/roles-command.repository.interface';
import { Role } from '../../domain/role-aggregate/role.aggregate';

@Injectable()
export class CreateRoleUseCase {
  public constructor(
    @Inject(ROLES_COMMAND_REPOSITORY)
    private readonly repository: IRolesCommandRepository,
  ) {}

  public async execute(request: ICreateRoleRequest): Promise<void> {
    const role = Role.create(request.name);

    await this.repository.save(role);
  }
}
