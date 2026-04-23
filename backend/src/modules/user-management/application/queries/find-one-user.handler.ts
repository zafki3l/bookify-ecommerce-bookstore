import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneUserQuery } from './find-one-user.query';
import { Inject } from '@nestjs/common';
import {
  type IUsersQueryRepository,
  USERS_QUERY_REPOSITORY,
} from '../../domain/repositories/users-query.repository.interface';
import { UserDto } from '../dto/user.dto';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(
    @Inject(USERS_QUERY_REPOSITORY)
    private readonly repository: IUsersQueryRepository,
  ) {}

  async execute(query: FindOneUserQuery): Promise<UserDto | null> {
    const user = await this.repository.findOne(query.id);

    return user;
  }
}
