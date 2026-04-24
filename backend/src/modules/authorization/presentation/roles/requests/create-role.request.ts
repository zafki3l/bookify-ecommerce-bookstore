import { IsString } from 'class-validator';
import { ICreateRoleRequest } from '../../../application/role-use-cases/create-role/create-role.request';

export class CreateRoleRequest implements ICreateRoleRequest {
  @IsString()
  public readonly name!: string;
}
