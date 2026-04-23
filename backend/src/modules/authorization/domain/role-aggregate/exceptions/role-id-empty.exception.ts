import { DomainException } from '../../../../../shared/exception/domain.exception';

export class RoleIdEmptyException extends DomainException {
  public constructor() {
    super('Role id is required', 'ROLE_ID_EMPTY');
  }
}
