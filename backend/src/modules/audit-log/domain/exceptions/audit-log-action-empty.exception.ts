import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../shared/exceptions/error.code';

export class AuditLogActionEmptyException extends DomainException {
  constructor() {
    super('Audit log action is required', ErrorCode.AUDIT_LOG_ACTION_EMPTY);
  }
}
