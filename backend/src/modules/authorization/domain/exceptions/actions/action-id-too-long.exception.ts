import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ActionErrorCode } from './action-error-code';

export class ActionIdTooLongException extends DomainException {
  constructor() {
    super('Action id is too long', ActionErrorCode.ACTION_ID_TOO_LONG);
  }
}
