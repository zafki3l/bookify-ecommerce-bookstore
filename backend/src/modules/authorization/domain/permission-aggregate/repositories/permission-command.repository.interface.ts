import { Permission } from '../permission.aggregate';

export interface IPermissionsCommandRepository {
  findOne(id: string): Promise<Permission>;

  save(permission: Permission, performedBy: string): Promise<void>;

  delete(permission: Permission): Promise<void>;
}

export const PERMISSIONS_COMMAND_REPOSITORY = 'IPermissionsCommandRepository';
