import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../../shared/exception/error.code';

export class ActionExistsException extends DomainException {
  constructor(id: string) {
    super(`Action ${id} already exists`, ErrorCode.IS_EXISTS);
  }
}
