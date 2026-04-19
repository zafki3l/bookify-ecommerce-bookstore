import { Inject, Injectable } from '@nestjs/common';
import { IActionExistsChecker } from '../../../domain/services/actions/action-exists-checker.service';
import {
  ACTIONS_QUERY_REPOSITORY,
  type IActionsQueryRepository,
} from '../../../domain/repositories/actions/actions-query.repository.interface';

@Injectable()
export class ActionExistsChecker implements IActionExistsChecker {
  constructor(
    @Inject(ACTIONS_QUERY_REPOSITORY)
    private readonly repository: IActionsQueryRepository,
  ) {}

  async isExist(id: string): Promise<boolean> {
    const action = await this.repository.findOne(id);

    return action ? true : false;
  }
}
