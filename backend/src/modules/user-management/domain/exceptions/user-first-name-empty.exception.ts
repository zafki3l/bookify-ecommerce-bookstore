import { DomainException } from '../../../../shared/exception/domain.exception';

export class UserFirstNameEmptyException extends DomainException {
  constructor() {
    super('First name is required', 'FIRST_NAME_EMPTY');
  }
}
