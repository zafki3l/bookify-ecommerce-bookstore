import { DomainException } from '../../../../shared/domain/exception/domain.exception';

export class UserLastNameEmptyException extends DomainException {
  constructor() {
    super('Last name is required', 'LAST_NAME_EMPTY');
  }
}
