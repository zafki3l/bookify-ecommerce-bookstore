import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from './create-role.command';
import { Inject } from '@nestjs/common';
import {
  type IRolesCommandRepository,
  ROLES_COMMAND_REPOSITORY,
} from '../../../domain/repositories/roles/roles-command.repository.interface';
import { Role } from '../../../domain/entities/role.entity';
import {
  type IRoleExistsChecker,
  ROLE_EXISTS_CHECKER,
} from '../../../domain/services/roles/role-exists-checker.service';
import { RoleExistsException } from '../../../domain/exceptions/roles/role-exists.exception';
import {
  CACHE_REPOSITORY,
  type ICacheRepository,
} from '../../../../../shared/cache/domain/cache.repository.interface';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    @Inject(ROLES_COMMAND_REPOSITORY)
    private readonly repository: IRolesCommandRepository,

    @Inject(CACHE_REPOSITORY)
    private readonly cache: ICacheRepository,

    @Inject(ROLE_EXISTS_CHECKER)
    private readonly roleExistsChecker: IRoleExistsChecker,
  ) {}

  async execute(command: CreateRoleCommand): Promise<Role> {
    const role = Role.create(command.name);

    const isExist = await this.roleExistsChecker.isExist(role.getId());
    if (isExist) {
      throw new RoleExistsException(role.getId());
    }

    await this.repository.save(role);
    await this.cache.del('roles:{}');

    return role;
  }
}
