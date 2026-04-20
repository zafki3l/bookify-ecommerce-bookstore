import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ActionErrorCode } from './action-error-code';

export class ActionExistsException extends DomainException {
  constructor(id: string) {
    super(`Action ${id} already exists`, ActionErrorCode.ACTION_EXISTS);
  }
}
