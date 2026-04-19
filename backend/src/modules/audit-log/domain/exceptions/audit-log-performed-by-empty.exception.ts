import { DomainException } from '../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../shared/exception/error.code';

export class AuditLogPerfomedByEmptyException extends DomainException {
  constructor() {
    super(
      'Audit log perfomedBy is required',
      ErrorCode.AUDIT_LOG_PERFOMED_BY_EMPTY,
    );
  }
}
