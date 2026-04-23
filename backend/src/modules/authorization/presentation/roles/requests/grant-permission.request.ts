import { IGrantPermissionRequest } from '../../../application/role-use-cases/grant-permission/grant-permission.request';

export class GrantPermissionRequest implements IGrantPermissionRequest {
  public constructor(public readonly permission: string) {}
}
