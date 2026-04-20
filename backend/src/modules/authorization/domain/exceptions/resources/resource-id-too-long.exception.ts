import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ResourceErrorCode } from './resource-error-code';

export class ResourceIdTooLongException extends DomainException {
  constructor() {
    super('Resource id is too long', ResourceErrorCode.RESOURCE_ID_TOO_LONG);
  }
}
