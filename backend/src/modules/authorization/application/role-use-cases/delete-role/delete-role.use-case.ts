import { Inject, Injectable } from '@nestjs/common';
import {
  type IRolesCommandRepository,
  ROLES_COMMAND_REPOSITORY,
} from '../../../domain/role-aggregate/repositories/roles-command.repository.interface';

@Injectable()
export class DeleteRoleUseCase {
  public constructor(
    @Inject(ROLES_COMMAND_REPOSITORY)
    private readonly repository: IRolesCommandRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const role = await this.repository.findOne(id);

    await this.repository.delete(role);
  }
}
