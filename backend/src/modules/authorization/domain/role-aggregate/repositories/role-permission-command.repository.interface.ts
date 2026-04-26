export interface IRolePermissionCommandRepository {
  grantPermission(roleId: string, permissionId: string): Promise<void>;

  revokePermission(roleId: string, permissionId: string): Promise<void>;

  revokePermissionByRoleId(roleId: string): Promise<string[]>;

  revokePermissionByPermissionId(permissionId: string): Promise<string[]>;
}

export const ROLE_PERMISSION_COMMAND_REPOSITORY =
  'IRolePermissionCommandRepository';
