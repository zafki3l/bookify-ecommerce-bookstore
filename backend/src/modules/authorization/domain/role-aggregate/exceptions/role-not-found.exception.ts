import { DomainException } from '../../../../../shared/exception/domain.exception';

export class RoleNotFoundException extends DomainException {
  public constructor(id: string) {
    super(`Role with id '${id}' is not found`, 'ROLE_NOT_FOUND');
  }
}
