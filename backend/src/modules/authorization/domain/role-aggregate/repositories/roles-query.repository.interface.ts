import { RoleReadModel } from '../read-models/role.read-model';

export interface IRolesQueryRepository {
  findAll(): Promise<RoleReadModel[]>;

  findOne(id: string): Promise<RoleReadModel | null>;
}

export const ROLES_QUERY_REPOSITORY = 'IRolesQueryRepository';
