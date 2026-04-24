import { Inject, Injectable } from '@nestjs/common';
import {
  type IPermissionsQueryRepository,
  PERMISSIONS_QUERY_REPOSITORY,
} from '../../../domain/permission-aggregate/repositories/permission-query.repository.interface';
import { FindOnePermissionResponse } from './find-one-permission.response';

@Injectable()
export class FindOnePermissionUseCase {
  public constructor(
    @Inject(PERMISSIONS_QUERY_REPOSITORY)
    private readonly repository: IPermissionsQueryRepository,
  ) {}

  public async execute(id: string): Promise<FindOnePermissionResponse | null> {
    const permission = await this.repository.findOne(id);

    if (!permission) {
      return null;
    }

    return new FindOnePermissionResponse(
      permission.id,
      permission.resource,
      permission.action,
    );
  }
}
