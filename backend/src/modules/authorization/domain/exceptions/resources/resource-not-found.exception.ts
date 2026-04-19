import { DomainException } from '../../../../../shared/exceptions/domain.exception';
import { ErrorCode } from '../../../../../shared/exceptions/error.code';

export class ResourceNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Resource with id ${id} is not found`, ErrorCode.NOT_FOUND);
  }
}
