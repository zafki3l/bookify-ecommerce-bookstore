import { DomainException } from '../../../../../shared/exception/domain.exception';
import { PermissionErrorCode } from './permission-error-code';

export class PermissionExistsException extends DomainException {
  constructor(id: string) {
    super(
      `Permission ${id} already exists`,
      PermissionErrorCode.PERMISSION_EXISTS,
    );
  }
}
