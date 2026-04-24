import { ICreateRoleRequest } from '../../../application/role-use-cases/create-role/create-role.request';

export class CreateRoleRequest implements ICreateRoleRequest {
  public constructor(public readonly name: string) {}
}
