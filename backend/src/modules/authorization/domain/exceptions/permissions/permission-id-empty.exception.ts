import { DomainException } from '../../../../../shared/exception/domain.exception';
import { PermissionErrorCode } from './permission-error-code';

export class PermissionIdEmptyException extends DomainException {
  constructor() {
    super('Permission id is required', PermissionErrorCode.PERMISSION_ID_EMPTY);
  }
}
