import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../../shared/exception/error.code';

export class ResourceIdEmptyException extends DomainException {
  constructor() {
    super('Resource id is required', ErrorCode.ID_EMPTY);
  }
}
