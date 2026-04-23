import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUsersQuery } from './find-users.query';
import { UserDto } from '../dto/user.dto';
import { Inject } from '@nestjs/common';
import {
  type IUsersQueryRepository,
  USERS_QUERY_REPOSITORY,
} from '../../domain/repositories/users-query.repository.interface';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler implements IQueryHandler<FindUsersQuery> {
  constructor(
    @Inject(USERS_QUERY_REPOSITORY)
    private readonly repository: IUsersQueryRepository,
  ) {}

  async execute(query: FindUsersQuery): Promise<UserDto[]> {
    const users = await this.repository.find();

    return users;
  }
}
