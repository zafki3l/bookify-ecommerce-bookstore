import { Resource } from '../../infrastructure/entities/resource.entity';

export interface IResourceRepository {
  save(resource: Resource): Promise<void>;
}

export const RESOURCE_REPOSITORY = 'IResourceRepository';
