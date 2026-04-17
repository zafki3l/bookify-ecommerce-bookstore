import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateResourceRequest } from '../../requests/resources/create-resource.request';
import { CreateResourceCommand } from '../../../application/commands/resources/create-resource.command';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  findAll() {
    return 'Danh sách resources';
  }

  @Post()
  create(@Body() request: CreateResourceRequest) {
    return this.commandBus.execute(
      new CreateResourceCommand(request.id, request.name),
    );
  }
}
