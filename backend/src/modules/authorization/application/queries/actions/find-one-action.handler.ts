import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneActionQuery } from './find-one-action.query';
import { Inject } from '@nestjs/common';
import {
  ACTIONS_QUERY_REPOSITORY,
  type IActionsQueryRepository,
} from '../../../domain/repositories/actions/actions-query.repository.interface';

@QueryHandler(FindOneActionQuery)
export class FindOneActionHandler implements IQueryHandler<FindOneActionQuery> {
  constructor(
    @Inject(ACTIONS_QUERY_REPOSITORY)
    private readonly repository: IActionsQueryRepository,
  ) {}

  async execute(
    query: FindOneActionQuery,
  ): Promise<{ id: string; name: string } | null> {
    const action = await this.repository.findOne(query.id);

    return action;
  }
}
