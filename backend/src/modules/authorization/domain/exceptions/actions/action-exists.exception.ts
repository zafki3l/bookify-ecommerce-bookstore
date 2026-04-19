import { DomainException } from '../../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../../shared/exceptions/error.code';

export class ActionExistsException extends DomainException {
  constructor(id: string) {
    super(`Action ${id} already exists`, ErrorCode.IS_EXISTS);
  }
}
