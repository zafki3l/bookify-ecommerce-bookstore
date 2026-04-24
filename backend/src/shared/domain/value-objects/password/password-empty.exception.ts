import { DomainException } from '../../exception/domain.exception';

export class PasswordEmptyException extends DomainException {
  constructor() {
    super('Password is required!', 'PASSWORD_EMPTY');
  }
}
