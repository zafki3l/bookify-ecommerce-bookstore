import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../../shared/exception/error.code';

export class ResourceIdTooLongException extends DomainException {
  constructor() {
    super('Resource id is too long', ErrorCode.ID_TOO_LONG);
  }
}
