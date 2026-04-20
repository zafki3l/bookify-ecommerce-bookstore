import { DomainException } from '../../../../shared/exception/domain.exception';
import { AuditLogErrorCode } from './audit-log-error-code';

export class AuditLogModuleEmptyException extends DomainException {
  constructor() {
    super(
      'Audit log module is required',
      AuditLogErrorCode.AUDIT_LOG_MODULE_EMPTY,
    );
  }
}
