import { Role } from '../../entities/role.entity';

export interface IRolesCommandRepository {
  findById(id: string): Promise<Role>;

  save(role: Role): Promise<void>;

  delete(role: Role): Promise<void>;
}

export const ROLES_COMMAND_REPOSITORY = 'IRolesCommandRepository';
