import { EntityManager } from 'typeorm';
import { RolePermissionTypeOrm } from '../../entities/role-permission.entity';
import { AuditlogWriteService } from '../../../../audit-log/infrastructure/services/audit-log-write.service';
import { PermissionRevoked } from '../../../domain/role-aggregate/events/permission-revoked.event';

export class PermissionRevokedHandler {
  public static async handle(
    event: PermissionRevoked,
    manager: EntityManager,
    performedBy: string,
  ): Promise<void> {
    await manager.delete(RolePermissionTypeOrm, {
      roleId: event.roleId,
      permissionId: event.permissionId,
    });

    await AuditlogWriteService.write(
      manager,
      'REVOKE_PERMISSION',
      performedBy,
      'authorization',
      'roles',
      { id: event.roleId, permissionId: event.permissionId },
    );
  }
}
