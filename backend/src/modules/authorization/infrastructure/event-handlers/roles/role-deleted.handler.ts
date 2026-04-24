import { EntityManager } from 'typeorm';
import { AuditlogWriteService } from '../../../../audit-log/infrastructure/services/audit-log-write.service';
import { Role } from '../../../domain/role-aggregate/role.aggregate';
import { RoleDeleted } from '../../../domain/role-aggregate/events/role-deleted.event';
import { RoleTypeOrm } from '../../entities/role.entity';

export class RoleDeletedHandler {
  public static async handle(
    event: RoleDeleted,
    manager: EntityManager,
    performedBy: string,
  ): Promise<void> {
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
