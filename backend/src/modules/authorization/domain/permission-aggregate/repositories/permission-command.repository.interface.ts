import { Permission } from '../permission.aggregate';

export interface IPermissionsCommandRepository {
  save(permission: Permission): Promise<void>;
}

export const PERMISSIONS_COMMAND_REPOSITORY = 'IPermissionsCommandRepository';
