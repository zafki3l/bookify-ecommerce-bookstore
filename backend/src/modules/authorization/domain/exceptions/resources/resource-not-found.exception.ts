import { DomainException } from '../../../../../shared/exceptions/domain.exception';

export class ResourceNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Resource with id ${id} is not found`, 'NOT_FOUND');
  }
}
