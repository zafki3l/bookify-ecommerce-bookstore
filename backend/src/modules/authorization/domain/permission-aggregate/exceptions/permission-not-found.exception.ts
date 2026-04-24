import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class PermissionNotFoundException extends DomainException {
  public constructor(id: string) {
    super(`Permission with id '${id}' is not found`, 'PERMISSION_NOT_FOUND');
  }
}
