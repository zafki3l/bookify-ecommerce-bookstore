import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceTypeOrm } from '../../entities/resource.entity';
import { IResourcesCommandRepository } from '../../../domain/repositories/resources/resource-command.repository.interface';
import { Resource } from '../../../domain/entities/resource.entity';
import { ResourcesMapper } from '../../mappers/resources.mapper';
import { ResourceNotFoundException } from '../../../domain/exceptions/resources/resource-not-found.exception';

@Injectable()
export class TypeOrmResourcesCommandRepository implements IResourcesCommandRepository {
  constructor(
    @InjectRepository(ResourceTypeOrm)
    private readonly repository: Repository<ResourceTypeOrm>,
  ) {}

  async findById(id: string): Promise<Resource> {
    const resource = await this.repository.findOne({ where: { id } });

    if (!resource) {
      throw new ResourceNotFoundException(id);
    }

    return ResourcesMapper.toDomain(resource);
  }

  async save(resource: Resource): Promise<void> {
    await this.repository.save(ResourcesMapper.toTypeOrm(resource));
  }

  async delete(resource: Resource): Promise<void> {
    await this.repository.delete({ id: resource.getId() });
  }
}
