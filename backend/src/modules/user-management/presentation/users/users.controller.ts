import { Controller, Get, Param } from '@nestjs/common';
import { FindUsersUseCase } from '../../application/user-use-cases/find-users/find-users.use-case';
import { FindOneUserUseCase } from '../../application/user-use-cases/find-one-users/find-one-user.use-case';
import { FindUsersResponse } from '../../application/user-use-cases/find-users/find-users.response';
import { FindOneUserResponse } from '../../application/user-use-cases/find-one-users/find-one-user.response';

@Controller('users')
export class UsersController {
  public constructor(
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  @Get()
  public async findAll(): Promise<FindUsersResponse[]> {
    const users = await this.findUsersUseCase.execute();

    return users;
  }

  @Get(':id')
  public async findOne(
    @Param('id') id: string,
  ): Promise<FindOneUserResponse | null> {
    const user = await this.findOneUserUseCase.execute(id);

    return user;
  }
}
