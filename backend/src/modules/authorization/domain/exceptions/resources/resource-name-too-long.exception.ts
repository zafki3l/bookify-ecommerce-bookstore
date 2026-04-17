import { DomainException } from '../../../../../shared/exceptions/domain.exception';

export class ResourceNameTooLongException extends DomainException {
  constructor() {
    super('Resource name is too long', 'NAME_TOO_LONG');
  }
}
