import { DomainException } from '../../../../shared/domain/exception/domain.exception';
import { AuditLogErrorCode } from './audit-log-error-code';

export class AuditLogIdEmptyException extends DomainException {
  constructor() {
    super('Audit log id is required', AuditLogErrorCode.AUDIT_LOG_ID_EMPTY);
  }
}
