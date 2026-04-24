import { Inject, Injectable } from '@nestjs/common';
import {
  type IPermissionsQueryRepository,
  PERMISSIONS_QUERY_REPOSITORY,
} from '../../../domain/permission-aggregate/repositories/permission-query.repository.interface';
import { FindPermissionsResponse } from './find-permissions.response';

@Injectable()
export class FindPermissionsUseCase {
  public constructor(
    @Inject(PERMISSIONS_QUERY_REPOSITORY)
    private readonly repository: IPermissionsQueryRepository,
  ) {}

  public async execute(): Promise<FindPermissionsResponse[]> {
    const permissions = await this.repository.findAll();

    return permissions.map(
      (permission) =>
        new FindPermissionsResponse(
          permission.id,
          permission.resource,
          permission.action,
        ),
    );
  }
}
