import { DomainException } from '../../../../../shared/exception/domain.exception';

export class EmailInvalidException extends DomainException {
  constructor(email: string) {
    super(
      `Email ${email} invalid! (valid format: example@example.com)`,
      'EMAIL_INVALID',
    );
  }
}
