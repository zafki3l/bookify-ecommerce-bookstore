import { Permission } from '../../entities/permission.entity';

export interface IPermissionsCommandRepository {
  save(permission: Permission): Promise<void>;
}

export const PERMISSION_COMMAND_REPOSITORY = 'IPermissionsCommandRepository';
