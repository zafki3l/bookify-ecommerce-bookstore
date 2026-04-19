import { DomainException } from '../../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../../shared/exceptions/error.code';

export class ActionIdEmptyException extends DomainException {
  constructor() {
    super('Action id is required', ErrorCode.ID_EMPTY);
  }
}
