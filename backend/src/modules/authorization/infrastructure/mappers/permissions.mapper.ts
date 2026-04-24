import { Permission } from '../../domain/permission-aggregate/permission.aggregate';
import { PermissionTypeOrm } from '../entities/permission.entity';

export class PermissionsMapper {
  public static toDomain(permissionTypeOrm: PermissionTypeOrm): Permission {
    return Permission.fromPersistent(
      permissionTypeOrm.id,
      permissionTypeOrm.resource,
      permissionTypeOrm.action,
    );
  }

  public static toTypeOrm(permission: Permission): PermissionTypeOrm {
    const permissionTypeOrm = new PermissionTypeOrm();

    permissionTypeOrm.id = permission.getId();
    permissionTypeOrm.resource = permission.getResource();
    permissionTypeOrm.action = permission.getAction();

    return permissionTypeOrm;
  }
}
