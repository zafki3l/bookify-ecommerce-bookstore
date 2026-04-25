import { EntityManager } from 'typeorm';
import { AuditlogWriteService } from '../../../../audit-log/infrastructure/services/audit-log-write.service';
import { RoleDeleted } from '../../../domain/role-aggregate/events/role-deleted.event';
import { RoleTypeOrm } from '../../entities/role.entity';
import { RolePermissionTypeOrm } from '../../entities/role-permission.entity';

export class RoleDeletedHandler {
  public static async handle(
    event: RoleDeleted,
    manager: EntityManager,
    performedBy: string,
  ): Promise<void> {
    const rolePermissions = await manager.find(RolePermissionTypeOrm, {
      where: { roleId: event.id },
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

    await manager.delete(RoleTypeOrm, { id: event.id });

    await AuditlogWriteService.write(
      manager,
      'DELETE_ROLE',
      performedBy,
      'authorization',
      'roles',
      { id: event.id, permissionRevoked: event.permissionsRevoked },
    );
  }
}
