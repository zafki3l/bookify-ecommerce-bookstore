import { Inject, Injectable } from '@nestjs/common';
import { ICreateRoleRequest } from './create-role.request';
import {
  type IRolesCommandRepository,
  ROLES_COMMAND_REPOSITORY,
} from '../../../domain/role-aggregate/repositories/roles-command.repository.interface';
import { Role } from '../../../domain/role-aggregate/role.aggregate';
import {
  type IRoleExistsChecker,
  ROLE_EXISTS_CHECKER,
} from '../../../domain/role-aggregate/services/role-exists-checker.service.interface';
import { RoleAlreadyExistsException } from '../../../domain/role-aggregate/exceptions/role-already-exists.exception';

@Injectable()
export class CreateRoleUseCase {
  public constructor(
    @Inject(ROLES_COMMAND_REPOSITORY)
    private readonly repository: IRolesCommandRepository,

    @Inject(ROLE_EXISTS_CHECKER)
    private readonly roleExistChecker: IRoleExistsChecker,
  ) {}

  public async execute(request: ICreateRoleRequest): Promise<void> {
    const role = Role.create(request.name);

    const isExists = await this.roleExistChecker.isExist(role.getId());
    if (isExists) {
      throw new RoleAlreadyExistsException(role.getId());
    }

    await this.repository.save(role);
  }
}
