import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../../shared/exception/error.code';

export class ResourceNameTooLongException extends DomainException {
  constructor() {
    super('Resource name is too long', ErrorCode.NAME_TOO_LONG);
  }
}
