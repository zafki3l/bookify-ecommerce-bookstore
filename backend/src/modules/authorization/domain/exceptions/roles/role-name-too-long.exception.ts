import { DomainException } from '../../../../../shared/exception/domain.exception';
import { RoleErrorCode } from './role-error-code';

export class RoleNameTooLongException extends DomainException {
  constructor() {
    super('Role name is too long', RoleErrorCode.ROLE_NAME_TOO_LONG);
  }
}
