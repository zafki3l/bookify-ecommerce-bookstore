import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../shared/exceptions/error.code';

export class AuditLogPerfomedByEmptyException extends DomainException {
  constructor() {
    super(
      'Audit log perfomedBy is required',
      ErrorCode.AUDIT_LOG_PERFOMED_BY_EMPTY,
    );
  }
}
