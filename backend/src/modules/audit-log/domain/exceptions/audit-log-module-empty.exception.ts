import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../shared/exceptions/error.code';

export class AuditLogModuleEmptyException extends DomainException {
  constructor() {
    super('Audit log module is required', ErrorCode.AUDIT_LOG_MODULE_EMPTY);
  }
}
