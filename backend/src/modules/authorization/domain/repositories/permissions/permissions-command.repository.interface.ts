import { Permission } from '../../entities/permission.entity';

export interface IPermissionsCommandRepository {
  findById(id: string): Promise<Permission>;

  save(permission: Permission): Promise<void>;

  delete(permission: Permission): Promise<void>;
}

export const PERMISSION_COMMAND_REPOSITORY = 'IPermissionsCommandRepository';
