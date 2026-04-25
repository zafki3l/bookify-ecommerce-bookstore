import { EntityManager } from 'typeorm';
import { AuditlogWriteService } from '../../../../audit-log/infrastructure/services/audit-log-write.service';
import { PermissionCreated } from '../../../domain/permission-aggregate/events/permission-created.event';
import { Permission } from '../../../domain/permission-aggregate/permission.aggregate';
import { PermissionsMapper } from '../../mappers/permissions.mapper';

export class PermissionCreatedHandler {
  public static async handle(
    permission: Permission,
    event: PermissionCreated,
    manager: EntityManager,
    performedBy: string,
  ): Promise<void> {
    await manager.save(PermissionsMapper.toTypeOrm(permission));

    await AuditlogWriteService.write(
      manager,
      'CREATE_PERMISSION',
      performedBy,
      'authorization',
      'permissions',
      { id: event.id },
    );
  }
}
