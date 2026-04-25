import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class PasswordVerifyFailed extends DomainException {
  public constructor() {
    super('Old password verify failed,', 'PASSWORD_VERIFY_FAILED');
  }
}
