import { IRenameRoleRequest } from '../../application/role-use-cases/rename-role/rename-role.request';

export class RenameRoleRequest implements IRenameRoleRequest {
  public constructor(public readonly name: string) {}
}
