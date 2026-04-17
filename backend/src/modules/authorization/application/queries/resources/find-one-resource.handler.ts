import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneResourceQuery } from './find-one-resource.query';
import { Inject } from '@nestjs/common';
import {
  type IResourceRepository,
  RESOURCE_REPOSITORY,
} from '../../../domain/repositories/resource.repository.interface';

@QueryHandler(FindOneResourceQuery)
export class FineOneResourceHandler implements IQueryHandler<FindOneResourceQuery> {
  constructor(
    @Inject(RESOURCE_REPOSITORY)
    private readonly repository: IResourceRepository,
  ) {}

  async execute(
    query: FindOneResourceQuery,
  ): Promise<{ id: string; name: string } | null> {
    return await this.repository.findOne(query.id);
  }
}
