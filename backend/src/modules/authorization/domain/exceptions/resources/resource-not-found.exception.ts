import { DomainException } from '../../../../../shared/exception/domain.exception';
import { ResourceErrorCode } from './resource-error-code';

export class ResourceNotFoundException extends DomainException {
  constructor(id: string) {
    super(
      `Resource with id ${id} is not found`,
      ResourceErrorCode.RESOURCE_NOT_FOUND,
    );
  }
}
