import { IsString } from 'class-validator';
import { IGrantPermissionRequest } from '../../../application/role-use-cases/grant-permission/grant-permission.request';

export class GrantPermissionRequest implements IGrantPermissionRequest {
  @IsString()
  public readonly permission: string;

  public constructor(permission: string) {
    this.permission = permission;
  }
}
