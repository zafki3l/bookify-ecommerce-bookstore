import { DomainException } from '../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../shared/exception/error.code';

export class AuditLogResourceIdEmptyException extends DomainException {
  constructor() {
    super(
      'Audit log resourceId is required',
      ErrorCode.AUDIT_LOG_RESOURCE_ID_EMPTY,
    );
  }
}
