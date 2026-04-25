import { EntityManager } from 'typeorm';
import { PermissionDeleted } from '../../../domain/permission-aggregate/events/permission-deleted.event';
import { AuditlogWriteService } from '../../../../audit-log/infrastructure/services/audit-log-write.service';
import { RolePermissionTypeOrm } from '../../entities/role-permission.entity';
import { PermissionTypeOrm } from '../../entities/permission.entity';

export class PermissionDeletedHandler {
  public static async handle(
    event: PermissionDeleted,
    manager: EntityManager,
    performedBy: string,
  ): Promise<void> {
    const rolePermissions = await manager.find(RolePermissionTypeOrm, {
      where: { permissionId: event.id },
    });

    for (const rolePermission of rolePermissions) {
      await manager.delete(RolePermissionTypeOrm, rolePermission);

      await AuditlogWriteService.write(
        manager,
        'DELETE_ROLE_PERMISSION',
        performedBy,
        'authorization',
        'role_permissions',
        {
          roleId: rolePermission.roleId,
          permissionId: rolePermission.permissionId,
        },
      );
    }

    await manager.delete(PermissionTypeOrm, { id: event.id });

    await AuditlogWriteService.write(
      manager,
      'DELETE_PERMISSION',
      performedBy,
      'authorization',
      'permissions',
      { id: event.id },
    );
  }
}
