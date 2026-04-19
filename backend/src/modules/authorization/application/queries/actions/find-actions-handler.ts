import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindActionsQuery } from './find-actions-query';
import { Inject } from '@nestjs/common';
import {
  ACTIONS_QUERY_REPOSITORY,
  type IActionsQueryRepository,
} from '../../../domain/repositories/actions/actions-query.repository.interface';

@QueryHandler(FindActionsQuery)
export class FindActionsHandler implements IQueryHandler<FindActionsQuery> {
  constructor(
    @Inject(ACTIONS_QUERY_REPOSITORY)
    private readonly repository: IActionsQueryRepository,
  ) {}

  async execute(
    query: FindActionsQuery,
  ): Promise<{ id: string; name: string }[]> {
    const actions = await this.repository.find();

    return actions;
  }
}
