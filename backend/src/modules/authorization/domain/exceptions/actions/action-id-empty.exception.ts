import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../../shared/exception/error.code';

export class ActionIdEmptyException extends DomainException {
  constructor() {
    super('Action id is required', ErrorCode.ID_EMPTY);
  }
}
