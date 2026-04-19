import { DomainException } from '../../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../../shared/exceptions/error.code';

export class ResourceNameTooLongException extends DomainException {
  constructor() {
    super('Resource name is too long', ErrorCode.NAME_TOO_LONG);
  }
}
