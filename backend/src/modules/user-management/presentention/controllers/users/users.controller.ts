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

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'all users';
  }

  @Get(':id')
  findOne() {
    return 'one users';
  }

  @Post()
  create(@Body() createUser: CreateUserDto) {}

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {}
}
