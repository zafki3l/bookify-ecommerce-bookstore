import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ResourceErrorCode } from './resource-error-code';

export class ResourceNameTooLongException extends DomainException {
  constructor() {
    super(
      'Resource name is too long',
      ResourceErrorCode.RESOURCE_NAME_TOO_LONG,
    );
  }
}
