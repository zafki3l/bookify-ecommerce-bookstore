import { DomainException } from '../../../../../shared/exception/domain.exception';
import { RoleErrorCode } from './role-error-code';

export class RoleIdEmptyException extends DomainException {
  constructor() {
    super('Role id is required', RoleErrorCode.ROLE_ID_EMPTY);
  }
}
