import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ResourceErrorCode } from './resource-error-code';

export class ResourceNameEmptyException extends DomainException {
  constructor() {
    super('Resource name is required', ResourceErrorCode.RESOURCE_NAME_EMPTY);
  }
}
