import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../../shared/exception/error.code';

export class ResourceNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Resource with id ${id} is not found`, ErrorCode.NOT_FOUND);
  }
}
