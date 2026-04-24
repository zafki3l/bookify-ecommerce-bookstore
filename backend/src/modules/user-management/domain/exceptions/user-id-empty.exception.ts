import { DomainException } from '../../../../shared/domain/exception/domain.exception';

export class UserIdEmptyException extends DomainException {
  constructor() {
    super('User id is required', 'USER_ID_EMPTY');
  }
}
