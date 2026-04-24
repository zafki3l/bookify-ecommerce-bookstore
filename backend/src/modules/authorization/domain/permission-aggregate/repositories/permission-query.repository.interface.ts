import { PermissionReadModel } from '../read-models/permission.read-model';

export interface IPermissionsQueryRepository {
  findAll(): Promise<PermissionReadModel[]>;

  findOne(id: string): Promise<PermissionReadModel | null>;
}

export const PERMISSIONS_QUERY_REPOSITORY = 'IPermissionsQueryRepository';
