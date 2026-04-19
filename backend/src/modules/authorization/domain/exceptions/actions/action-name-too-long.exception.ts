import { DomainException } from '../../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../../shared/exceptions/error.code';

export class ActionNameTooLongException extends DomainException {
  constructor() {
    super('Action name is too long', ErrorCode.NAME_TOO_LONG);
  }
}
