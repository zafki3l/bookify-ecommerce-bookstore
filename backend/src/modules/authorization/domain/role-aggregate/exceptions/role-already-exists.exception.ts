import { DomainException } from '../../../../../shared/exception/domain.exception';

export class RoleAlreadyExistsException extends DomainException {
  public constructor(id: string) {
    super(`Role '${id}' already exists`, 'ROLE_ALREADY_EXISTS');
  }
}
