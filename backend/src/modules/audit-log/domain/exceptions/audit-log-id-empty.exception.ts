import { DomainException } from '../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../shared/exceptions/error.code';

export class AuditLogIdEmptyException extends DomainException {
  constructor() {
    super('Audit log id is required', ErrorCode.ID_EMPTY);
  }
}
