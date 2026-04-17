import { Resource } from '../../entities/resource.entity';

export interface IResourcesCommandRepository {
  findById(id: string): Promise<Resource>;

  save(resource: Resource): Promise<void>;

  delete(resource: Resource): Promise<void>;
}

export const RESOURCES_COMMAND_REPOSITORY = 'IResourcesCommandRepository';
