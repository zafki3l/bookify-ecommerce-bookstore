import { DomainException } from '../../../../../shared/exceptions/domain.exception';

export class ResourceExistsException extends DomainException {
  constructor(id: string) {
    super(`Resource ${id} already exists`, 'IS_EXISTS');
  }
}
