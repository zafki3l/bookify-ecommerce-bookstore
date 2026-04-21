import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRoleCommand } from './update-role.command';
import { Role } from '../../../domain/entities/role.entity';
import { Inject } from '@nestjs/common';
import {
  type IRolesCommandRepository,
  ROLES_COMMAND_REPOSITORY,
} from '../../../domain/repositories/roles/roles-command.repository.interface';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
  constructor(
    @Inject(ROLES_COMMAND_REPOSITORY)
    private readonly repository: IRolesCommandRepository,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<Role> {
    const role = await this.repository.findById(command.id);

    role.updateName(command.name);

    await this.repository.save(role);

    return role;
  }
}
