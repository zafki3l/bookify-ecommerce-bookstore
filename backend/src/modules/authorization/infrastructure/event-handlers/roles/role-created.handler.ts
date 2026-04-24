import { EntityManager } from 'typeorm';
import { RoleCreated } from '../../../domain/role-aggregate/events/role-created.event';
import { AuditlogWriteService } from '../../../../audit-log/infrastructure/services/audit-log-write.service';
import { Role } from '../../../domain/role-aggregate/role.aggregate';
import { RoleMappers } from '../../mappers/roles.mapper';

export class RoleCreatedHandler {
  public static async handle(
    role: Role,
    event: RoleCreated,
    manager: EntityManager,
    performedBy: string,
  ): Promise<void> {
    await manager.save(RoleMappers.toTypeOrm(role));

    await AuditlogWriteService.write(
      manager,
      'CREATE_ROLE',
      performedBy,
      'authorization',
      'roles',
      { id: event.id },
    );
  }
}
