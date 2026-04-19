import { DomainException } from '../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../shared/exception/error.code';

export class AuditLogIdEmptyException extends DomainException {
  constructor() {
    super('Audit log id is required', ErrorCode.ID_EMPTY);
  }
}
