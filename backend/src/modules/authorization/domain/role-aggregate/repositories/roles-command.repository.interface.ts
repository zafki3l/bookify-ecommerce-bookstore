import { Role } from '../role.aggregate';

export interface IRolesCommandRepository {
  findOne(id: string): Promise<Role>;

  save(role: Role, performedBy: string): Promise<void>;

  delete(role: Role, performedBy: string): Promise<void>;
}

export const ROLES_COMMAND_REPOSITORY = 'IRolesCommandRepository';
