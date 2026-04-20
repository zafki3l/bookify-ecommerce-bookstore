import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ActionErrorCode } from './action-error-code';

export class ActionIdEmptyException extends DomainException {
  constructor() {
    super('Action id is required', ActionErrorCode.ACTION_ID_EMPTY);
  }
}
