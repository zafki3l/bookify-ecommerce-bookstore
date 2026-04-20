import { DomainException } from '../../../../shared/exception/domain.exception';
import { AuditLogErrorCode } from './audit-log-error-code';

export class AuditLogPerfomedByEmptyException extends DomainException {
  constructor() {
    super(
      'Audit log perfomedBy is required',
      AuditLogErrorCode.AUDIT_LOG_PERFOMED_BY_EMPTY,
    );
  }
}
