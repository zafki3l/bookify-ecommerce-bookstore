import { AuditLog } from '../../domain/entities/audit-log.entity';
import { AuditLogTypeOrm } from '../entities/typeorm-auditlog.entity';

export class AuditLogMapper {
  static toDomain(auditLogTypeOrm: AuditLogTypeOrm): AuditLog {
    return AuditLog.create(
      auditLogTypeOrm.id,
      auditLogTypeOrm.action,
      auditLogTypeOrm.module,
      auditLogTypeOrm.resourceId,
      auditLogTypeOrm.performedBy,
      auditLogTypeOrm.metadata,
    );
  }

  static toTypeOrm(auditlog: AuditLog): AuditLogTypeOrm {
    const auditLogTypeOrm = new AuditLogTypeOrm();

    auditLogTypeOrm.id = auditlog.getId();
    auditLogTypeOrm.action = auditlog.getAction();
    auditLogTypeOrm.module = auditlog.getModule();
    auditLogTypeOrm.resourceId = auditlog.getResourceId();
    auditLogTypeOrm.performedBy = auditlog.getPerfomedBy();
    auditLogTypeOrm.metadata = auditlog.getMetadata();

    return auditLogTypeOrm;
  }
}
