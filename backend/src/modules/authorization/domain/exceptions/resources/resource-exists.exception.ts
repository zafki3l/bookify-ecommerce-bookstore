import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ResourceErrorCode } from './resource-error-code';

export class ResourceExistsException extends DomainException {
  constructor(id: string) {
    super(`Resource ${id} already exists`, ResourceErrorCode.RESOURCE_EXISTS);
  }
}
