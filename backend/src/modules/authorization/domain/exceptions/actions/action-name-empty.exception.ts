import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ActionErrorCode } from './action-error-code';

export class ActionNameEmptyException extends DomainException {
  constructor() {
    super('Action name is required', ActionErrorCode.ACTION_NAME_EMPTY);
  }
}
