import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateUserDto } from '../../dto/users/update-user.dto';
import { CreateUserDto } from '../../dto/users/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindUsersQuery } from '../../../application/queries/find-users.query';
import { UserResponseDto } from '../../dto/users/user-response.dto';
import { FindOneUserQuery } from '../../../application/queries/find-one-user.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.queryBus.execute(new FindUsersQuery());

    return users.map(
      (user) =>
        new UserResponseDto(
          user.id,
          user.firstName,
          user.lastName,
          user.email,
          user.gender,
        ),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
    const user = await this.queryBus.execute(new FindOneUserQuery(id));

    if (!user) {
      return null;
    }

    return new UserResponseDto(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.gender,
    );
  }

  @Post()
  create(@Body() createUser: CreateUserDto) {}

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {}
}
