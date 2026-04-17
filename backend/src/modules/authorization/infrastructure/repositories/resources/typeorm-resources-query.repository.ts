import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceTypeOrm } from '../../entities/resource.entity';
import { IResourcesQueryRepository } from '../../../domain/repositories/resources/resource-query.repository.interface';

@Injectable()
export class TypeOrmResourcesQueryRepository implements IResourcesQueryRepository {
  constructor(
    @InjectRepository(ResourceTypeOrm)
    private readonly repository: Repository<ResourceTypeOrm>,
  ) {}

  async find(): Promise<{ id: string; name: string }[]> {
    return this.repository.find({
      select: ['id', 'name'],
    });
  }

  async findOne(id: string): Promise<{ id: string; name: string } | null> {
    const resource = await this.repository.findOne({ where: { id } });

    if (!resource) return null;

    return {
      id: resource.id,
      name: resource.name,
    };
  }
}
