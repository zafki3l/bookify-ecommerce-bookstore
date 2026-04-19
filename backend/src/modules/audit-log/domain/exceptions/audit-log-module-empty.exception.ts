import { DomainException } from '../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../shared/exception/error.code';

export class AuditLogModuleEmptyException extends DomainException {
  constructor() {
    super('Audit log module is required', ErrorCode.AUDIT_LOG_MODULE_EMPTY);
  }
}
