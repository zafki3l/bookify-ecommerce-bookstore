import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class RoleNameEmptyException extends DomainException {
  public constructor() {
    super('Role name is required!', 'ROLE_NAME_EMPTY');
  }
}
