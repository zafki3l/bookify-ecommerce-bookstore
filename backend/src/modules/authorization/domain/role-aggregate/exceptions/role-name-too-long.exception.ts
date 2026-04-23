import { DomainException } from '../../../../../shared/exception/domain.exception';

export class RoleNameTooLongException extends DomainException {
  public constructor() {
    super(
      `Role name can't be too long (max: 50 characters)`,
      'ROLE_NAME_TOO_LONG',
    );
  }
}
