import { Resource } from '../entities/resource.entity';

export interface IResourceRepository {
  find(): Promise<{ id: string; name: string }[]>;

  findOne(id: string): Promise<{ id: string; name: string } | null>;

  save(resource: Resource): Promise<void>;
}

export const RESOURCE_REPOSITORY = 'IResourceRepository';
