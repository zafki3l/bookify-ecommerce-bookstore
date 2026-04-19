import { Inject, Injectable } from '@nestjs/common';
import { IResourceExistsChecker } from '../../../domain/services/resources/resource-exists-checker.service';
import {
  type IResourcesQueryRepository,
  RESOURCES_QUERY_REPOSITORY,
} from '../../../domain/repositories/resources/resources-query.repository.interface';

@Injectable()
export class ResourceExistsChecker implements IResourceExistsChecker {
  constructor(
    @Inject(RESOURCES_QUERY_REPOSITORY)
    private readonly repository: IResourcesQueryRepository,
  ) {}

  async isExist(id: string): Promise<boolean> {
    const resource = await this.repository.findOne(id);

    return resource ? true : false;
  }
}
