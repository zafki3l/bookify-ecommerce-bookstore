import { RolePermission } from '../../domain/entities/role-permission.entity';
import { RolePermissionTypeOrm } from '../entities/role-permission.entity';

export class RolePermissionMapper {
  static toDomain(
    rolePermissionTypeOrm: RolePermissionTypeOrm,
  ): RolePermission {
    return RolePermission.fromPersistent(
      rolePermissionTypeOrm.roleId,
      rolePermissionTypeOrm.permissionId,
    );
  }

  static toModel(rolePermission: RolePermission): RolePermissionTypeOrm {
    const rolePermissionTypeOrm = new RolePermissionTypeOrm();

    rolePermissionTypeOrm.roleId = rolePermission.getRoleId();
    rolePermissionTypeOrm.permissionId = rolePermission.getPermissionId();

    return rolePermissionTypeOrm;
  }
}
