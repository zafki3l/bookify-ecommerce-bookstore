import { DomainException } from '../../../../../shared/exceptions/domain.exception';

export class ResourceIdTooLongException extends DomainException {
  constructor() {
    super('Resource id is too long', 'ID_TOO_LONG');
  }
}
