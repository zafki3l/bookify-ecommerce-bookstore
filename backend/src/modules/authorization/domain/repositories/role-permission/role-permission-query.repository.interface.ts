export interface IRolePermissionQueryRepository {
  find(): Promise<{ roleId: string; permissionId: string }[]>;

  findOne(
    roleId: string,
    permissionId: string,
  ): Promise<{ roleId: string; permissionId: string } | null>;
}

export const ROLE_PERMISSION_QUERY_REPOSITORY =
  'IRolePermissionQueryRepository';
