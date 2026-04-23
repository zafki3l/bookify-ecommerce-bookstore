import { DomainException } from '../../../../../shared/exception/domain.exception';

export class PermissionAlreadyGrantedException extends DomainException {
  public constructor(permission: string) {
    super(
      `Permission '${permission}' is already granted`,
      'PERMISSION_ALREADY_GRANTED',
    );
  }
}
