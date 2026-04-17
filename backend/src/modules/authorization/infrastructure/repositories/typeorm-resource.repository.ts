import { Injectable } from '@nestjs/common';
import { IResourceRepository } from '../../domain/repositories/resource.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../../domain/entities/resource.entity';
import { ResourceTypeOrm } from '../entities/resource.entity';
import { ResourcesMapper } from '../mappers/resources.mapper';

@Injectable()
export class TypeOrmResourceRepository implements IResourceRepository {
  constructor(
    @InjectRepository(ResourceTypeOrm)
    private readonly repository: Repository<ResourceTypeOrm>,
  ) {}

  async find(): Promise<{ id: string; name: string }[]> {
    return this.repository.find({
      select: ['id', 'name'],
    });
  }

  async save(resource: Resource): Promise<void> {
    await this.repository.save(ResourcesMapper.toTypeOrm(resource));
  }
}
