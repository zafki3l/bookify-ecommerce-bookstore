export interface IPermissionsQueryRepository {
  find(): Promise<{ id: string; resourceId: string; actionId: string }[]>;

  findOne(
    id: string,
  ): Promise<{ id: string; resourceId: string; actionId: string } | null>;
}

export const PERMISSIONS_QUERY_REPOSITORY = 'IPermissionsQueryRepository';
