import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../shared/exceptions/error.code';

export class AuditLogResourceIdEmptyException extends DomainException {
  constructor() {
    super(
      'Audit log resourceId is required',
      ErrorCode.AUDIT_LOG_RESOURCE_ID_EMPTY,
    );
  }
}
