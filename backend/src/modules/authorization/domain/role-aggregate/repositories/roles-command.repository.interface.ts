import { Role } from '../role.aggregate';

export interface IRolesCommandRepository {
  save(role: Role): Promise<void>;
}

export const ROLES_COMMAND_REPOSITORY = 'IRolesCommandRepository';
