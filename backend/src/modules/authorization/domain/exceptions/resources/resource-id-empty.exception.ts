import { DomainException } from '../../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../../shared/exceptions/error.code';

export class ResourceIdEmptyException extends DomainException {
  constructor() {
    super('Resource id is required', ErrorCode.ID_EMPTY);
  }
}
