import { DomainException } from '../../../../../shared/exception/domain.exception';
import { RoleErrorCode } from './role-error-code';

export class RoleExistsException extends DomainException {
  constructor(id: string) {
    super(`Role ${id} already exists`, RoleErrorCode.ROLE_EXISTS);
  }
}
