import { RolePermission } from '../../entities/role-permission.entity';

export interface IRolePermissionCommandRepository {
  findOne(roleId: string, permissionId: string): Promise<RolePermission>;

  save(rolePermission: RolePermission): Promise<void>;

  delete(rolePermission: RolePermission): Promise<void>;
}

export const ROLE_PERMISSION_COMMAND_REPOSITORY =
  'IRolePermissionCommandRepository';
