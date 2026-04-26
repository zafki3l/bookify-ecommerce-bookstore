import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FindUsersUseCase } from '../../application/user-use-cases/find-users/find-users.use-case';
import { FindOneUserUseCase } from '../../application/user-use-cases/find-one-users/find-one-user.use-case';
import { FindUsersResponse } from '../../application/user-use-cases/find-users/find-users.response';
import { FindOneUserResponse } from '../../application/user-use-cases/find-one-users/find-one-user.response';
import { CreateUserRequest } from './requests/create-user.request';
import ExceptionHandler from '../../../../shared/domain/exception/exception.handler';
import { CreateUserUseCase } from '../../application/user-use-cases/create-user/create-user.use-case';

@Controller('users')
export class UsersController {
  private static performedBy = '23213213123123123';

  public constructor(
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
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

  @Post()
  public async create(@Body() request: CreateUserRequest): Promise<void> {
    try {
      await this.createUserUseCase.execute(
        request,
        UsersController.performedBy,
      );
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }
}
