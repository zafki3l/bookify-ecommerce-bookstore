import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class PasswordNotMatchingException extends DomainException {
  public constructor() {
    super('Password is not match, try again', 'PASSWORD_NOT_MATCH');
  }
}
