import { EntityManager } from 'typeorm';
import { PermissionGranted } from '../../../domain/role-aggregate/events/permission-granted.event';
import { RolePermissionTypeOrm } from '../../entities/role-permission.entity';
import { AuditlogWriteService } from '../../../../audit-log/infrastructure/services/audit-log-write.service';

export class PermissionGrantedHandler {
  public static async handle(
    event: PermissionGranted,
    manager: EntityManager,
    performedBy: string,
  ): Promise<void> {
    const rolePermissionTypeOrm = new RolePermissionTypeOrm();

    rolePermissionTypeOrm.roleId = event.roleId;
    rolePermissionTypeOrm.permissionId = event.permissionId;

    await manager.save(rolePermissionTypeOrm);

    await AuditlogWriteService.write(
      manager,
      'GRANT_PERMISSION',
      performedBy,
      'authorization',
      'roles',
      { id: event.roleId, permissionId: event.permissionId },
    );
  }
}
