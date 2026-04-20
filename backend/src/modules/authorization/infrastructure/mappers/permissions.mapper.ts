import { Permission } from '../../domain/entities/permission.entity';
import { PermissionTypeOrm } from '../entities/permission.entity';

export class PermissionsMapper {
  static toDomain(permissionTypeOrm: PermissionTypeOrm): Permission {
    return Permission.fromPersistent(
      permissionTypeOrm.id,
      permissionTypeOrm.resourceId,
      permissionTypeOrm.actionId,
    );
  }

  static toModel(permission: Permission): PermissionTypeOrm {
    const permissionTypeOrm = new PermissionTypeOrm();

    permissionTypeOrm.id = permission.getId();
    permissionTypeOrm.resourceId = permission.getResourceId();
    permissionTypeOrm.actionId = permission.getActionId();

    return permissionTypeOrm;
  }
}
