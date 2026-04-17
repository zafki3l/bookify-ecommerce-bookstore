import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateResourceDto } from '../../dto/resources/create-resource.dto';
import { CreateResourceCommand } from '../../../application/commands/resources/create-resource.command';
import { ResourceResponseDto } from '../../dto/resources/resource-response.dto';
import { FindResourcesQuery } from '../../../application/queries/resources/find-resources.query';
import ExceptionHandler from '../../../../../shared/exceptions/exception.handler';

@Controller('resources')
export class ResourcesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findAll(): Promise<ResourceResponseDto[]> {
    const resources = await this.queryBus.execute(new FindResourcesQuery());

    return resources
      ? resources.map(
          (resource) => new ResourceResponseDto(resource.id, resource.name),
        )
      : [];
  }

  @Post()
  async create(
    @Body() request: CreateResourceDto,
  ): Promise<ResourceResponseDto> {
    try {
      const resource = await this.commandBus.execute(
        new CreateResourceCommand(request.id, request.name),
      );

      return new ResourceResponseDto(resource.getId(), resource.getName());
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }
}
