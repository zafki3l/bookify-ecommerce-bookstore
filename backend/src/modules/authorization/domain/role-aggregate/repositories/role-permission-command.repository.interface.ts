export interface IRolePermissionCommandRepository {
  grantPermission(roleId: string, permissionId: string): Promise<void>;

  revokePermission(roleId: string, permissionId: string): Promise<void>;
}

export const ROLE_PERMISSION_COMMAND_REPOSITORY =
  'IRolePermissionCommandRepository';
