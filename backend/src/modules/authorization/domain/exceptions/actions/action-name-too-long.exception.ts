import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../../shared/exception/error.code';

export class ActionNameTooLongException extends DomainException {
  constructor() {
    super('Action name is too long', ErrorCode.NAME_TOO_LONG);
  }
}
