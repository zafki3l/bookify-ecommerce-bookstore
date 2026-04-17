import { Injectable } from '@nestjs/common';
import { IResourceRepository } from '../../domain/repositories/resource.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Resource } from '../entities/resource.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmResourceRepository implements IResourceRepository {
  constructor(
    @InjectRepository(Resource)
    private readonly repository: Repository<Resource>,
  ) {}

  async save(resource: Resource): Promise<void> {
    await this.repository.save(resource);
  }
}
