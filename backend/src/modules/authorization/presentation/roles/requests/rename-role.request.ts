import { IsString } from 'class-validator';
import { IRenameRoleRequest } from '../../../application/role-use-cases/rename-role/rename-role.request';

export class RenameRoleRequest implements IRenameRoleRequest {
  @IsString()
  public readonly name!: string;
}
