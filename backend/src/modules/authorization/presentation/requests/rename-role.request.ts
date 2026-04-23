import { IRenameRoleRequest } from '../../application/requests/rename-role.request';

export class RenameRoleRequest implements IRenameRoleRequest {
  public constructor(public readonly name: string) {}
}
