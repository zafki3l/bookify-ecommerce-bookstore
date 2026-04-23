import { DomainException } from '../../exception/domain.exception';

export class PasswordTooShortException extends DomainException {
  constructor() {
    super(
      `Password can't be too short! (min: 8 characters)`,
      'PASSWORD_TOO_SHORT',
    );
  }
}
