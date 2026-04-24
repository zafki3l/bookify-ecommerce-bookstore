import { DomainException } from '../../../../../shared/exception/domain.exception';

export class ResourceInvalidException extends DomainException {
  public constructor(resource: string) {
    super(
      `Resource with value '${resource}' is not a valid option`,
      'RESOURCE_INVALID_OPTION',
    );
  }
}
