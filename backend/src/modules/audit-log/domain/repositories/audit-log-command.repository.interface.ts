import { AuditLog } from '../entities/audit-log.entity';

export interface IAuditLogCommandRepository {
  save(auditlog: AuditLog): Promise<void>;
}

export const AUDIT_LOG_COMMAND_REPOSITORY = 'IAuditLogCommandRepository';
