import { DomainException } from '../../../../../shared/exception/domain.exception';
import { PermissionErrorCode } from './permission-error-code';

export class PermissionNotFoundException extends DomainException {
  constructor(id: string) {
    super(
      `Permission with id ${id} is not found`,
      PermissionErrorCode.PERMISSION_NOT_FOUND,
    );
  }
}
