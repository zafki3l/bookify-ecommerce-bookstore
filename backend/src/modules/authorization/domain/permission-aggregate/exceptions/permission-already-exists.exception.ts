import { DomainException } from '../../../../../shared/domain/exception/domain.exception';

export class PermissionAlreadyExistsException extends DomainException {
  public constructor(id: string) {
    super(
      `Permission with id '${id}' already exists`,
      'PERMISSION_ALREADY_EXISTS',
    );
  }
}
