import { DomainException } from '../../../../../shared/exception/domain.exception';

export class PermissionNotFoundException extends DomainException {
  public constructor(permission: string) {
    super(`Permission ${permission} is not found`, 'PERMISSION_NOT_FOUND');
  }
}
