export interface IResourcesQueryRepository {
  find(): Promise<{ id: string; name: string }[]>;

  findOne(id: string): Promise<{ id: string; name: string } | null>;
}

export const RESOURCES_QUERY_REPOSITORY = 'IResourcesQueryRepository';
