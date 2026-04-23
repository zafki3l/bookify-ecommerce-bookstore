import { ICreateRoleRequest } from '../../application/requests/create-role.request';

export class CreateRoleRequest implements ICreateRoleRequest {
  public constructor(public readonly name: string) {}
}
