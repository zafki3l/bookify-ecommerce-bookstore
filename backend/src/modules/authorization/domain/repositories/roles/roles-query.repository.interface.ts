export interface IRolesQueryRepository {
  find(): Promise<{ id: string; name: string }[]>;

  findOne(id: string): Promise<{ id: string; name: string } | null>;
}

export const ROLES_QUERY_REPOSITORY = 'IRolesQueryRepository';
