import { EntityManager } from 'typeorm';
import { RoleRenamed } from '../../../domain/role-aggregate/events/role-renamed.event';
import { Role } from '../../../domain/role-aggregate/role.aggregate';
import { RoleMappers } from '../../mappers/roles.mapper';
import { AuditlogWriteService } from '../../../../audit-log/infrastructure/services/audit-log-write.service';

export class RoleRenamedHandler {
  public static async handle(
    role: Role,
    event: RoleRenamed,
    manager: EntityManager,
    performedBy: string,
  ): Promise<void> {
    await manager.save(RoleMappers.toTypeOrm(role));

    await AuditlogWriteService.write(
      manager,
      'RENAME_ROLE',
      performedBy,
      'authorization',
      'roles',
      { id: event.id, oldName: event.oldName, newName: event.newName },
    );
  }
}
