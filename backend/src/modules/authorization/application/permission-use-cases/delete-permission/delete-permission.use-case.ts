import { Inject, Injectable } from '@nestjs/common';
import {
  type IPermissionsCommandRepository,
  PERMISSIONS_COMMAND_REPOSITORY,
} from '../../../domain/permission-aggregate/repositories/permission-command.repository.interface';

@Injectable()
export class DeletePermissionUseCase {
  public constructor(
    @Inject(PERMISSIONS_COMMAND_REPOSITORY)
    private readonly repository: IPermissionsCommandRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const permission = await this.repository.findOne(id);

    if (!permission) {
      return;
    }

    await this.repository.delete(permission);
  }
}
