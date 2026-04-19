import { Resource } from '../../domain/entities/resource.entity';
import { ResourceTypeOrm } from '../entities/resource.entity';

export class ResourcesMapper {
  static toDomain(resourceTypeOrm: ResourceTypeOrm): Resource {
    return Resource.create(resourceTypeOrm.name);
  }

  static toTypeOrm(resource: Resource): ResourceTypeOrm {
    const resourceTypeOrm = new ResourceTypeOrm();

    resourceTypeOrm.id = resource.getId();
    resourceTypeOrm.name = resource.getName();

    return resourceTypeOrm;
  }
}
