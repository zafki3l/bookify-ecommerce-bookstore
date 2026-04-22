import { DomainException } from '../../../../../shared/exception/domain.exception';
import { RolePermissionErrorCode } from './role-permission-error-code';

export class RolePermissionNotFoundException extends DomainException {
  constructor(roleId: string, permissionId: string) {
    super(
      `Role Permission with roleId ${roleId} and permissionId ${permissionId} is not found`,
      RolePermissionErrorCode.ROLE_PERMISSION_NOT_FOUND,
    );
  }
}
