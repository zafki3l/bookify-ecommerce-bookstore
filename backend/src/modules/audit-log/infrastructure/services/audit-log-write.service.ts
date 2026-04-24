import { EntityManager } from 'typeorm';
import { AuditLogTypeOrm } from '../entities/typeorm-auditlog.entity';

export class AuditlogWriteService {
  public static async write(
    manager: EntityManager,
    action: string,
    performedBy: string,
    module: string,
    resource: string,
    metadata: object = {},
  ): Promise<void> {
    await manager.save(AuditLogTypeOrm, {
      action,
      module,
      resource,
      performedBy,
      metadata,
    });
  }
}
