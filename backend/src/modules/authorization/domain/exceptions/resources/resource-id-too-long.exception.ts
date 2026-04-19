import { DomainException } from '../../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../../shared/exceptions/error.code';

export class ResourceIdTooLongException extends DomainException {
  constructor() {
    super('Resource id is too long', ErrorCode.ID_TOO_LONG);
  }
}
