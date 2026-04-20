import { DomainException } from '../../../../shared/exception/domain.exception';
import { AuditLogErrorCode } from './audit-log-error-code';

export class AuditLogResourceIdEmptyException extends DomainException {
  constructor() {
    super(
      'Audit log resourceId is required',
      AuditLogErrorCode.AUDIT_LOG_RESOURCE_ID_EMPTY,
    );
  }
}
