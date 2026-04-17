import { DomainException } from '../../../../../shared/exceptions/domain.exception';

export class ResourceIdEmptyException extends DomainException {
  constructor() {
    super('Resource id is required', 'ID_EMPTY');
  }
}
