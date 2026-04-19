import { DomainException } from '../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../shared/exception/error.code';

export class AuditLogActionEmptyException extends DomainException {
  constructor() {
    super('Audit log action is required', ErrorCode.AUDIT_LOG_ACTION_EMPTY);
  }
}
