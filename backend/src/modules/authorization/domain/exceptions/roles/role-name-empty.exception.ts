import { DomainException } from '../../../../../shared/exception/domain.exception';
import { RoleErrorCode } from './role-error-code';

export class RoleNameEmptyException extends DomainException {
  constructor() {
    super('Role name is required', RoleErrorCode.ROLE_NAME_EMPTY);
  }
}
