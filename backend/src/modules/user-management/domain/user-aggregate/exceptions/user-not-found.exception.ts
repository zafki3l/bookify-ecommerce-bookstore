import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class UserNotFoundException extends DomainException {
  public constructor() {
    super('User not found', 'USER_NOT_FOUND');
  }
}
