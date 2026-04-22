import { PermissionIdEmptyException } from '../exceptions/permissions/permission-id-empty.exception';
import { RoleIdEmptyException } from '../exceptions/roles/role-id-empty.exception';

export class RolePermission {
  private constructor(
    private roleId: string,
    private permissionId: string,
  ) {}

  static create(roleId: string, permissionId: string): RolePermission {
    if (!roleId) {
      throw new RoleIdEmptyException();
    }

    if (!permissionId) {
      throw new PermissionIdEmptyException();
    }

    return new RolePermission(roleId, permissionId);
  }

  static fromPersistent(roleId: string, permissionId: string): RolePermission {
    return new RolePermission(roleId, permissionId);
  }

  getRoleId(): string {
    return this.roleId;
  }

  getPermissionId(): string {
    return this.permissionId;
  }
}
