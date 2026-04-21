import { DomainException } from '../../../../../shared/exception/domain.exception';
import { RoleErrorCode } from './role-error-code';

export class RoleNotFoundException extends DomainException {
  constructor(id: string) {
    super(`Role with id ${id} is not found`, RoleErrorCode.ROLE_NOT_FOUND);
  }
}
