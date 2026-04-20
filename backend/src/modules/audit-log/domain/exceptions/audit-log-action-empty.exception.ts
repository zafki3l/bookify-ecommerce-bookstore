import { DomainException } from '../../../../shared/exception/domain.exception';
import { AuditLogErrorCode } from './audit-log-error-code';

export class AuditLogActionEmptyException extends DomainException {
  constructor() {
    super(
      'Audit log action is required',
      AuditLogErrorCode.AUDIT_LOG_ACTION_EMPTY,
    );
  }
}
