import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ErrorCode } from '../../../../../shared/exception/error.code';

export class ResourceExistsException extends DomainException {
  constructor(id: string) {
    super(`Resource ${id} already exists`, ErrorCode.IS_EXISTS);
  }
}
