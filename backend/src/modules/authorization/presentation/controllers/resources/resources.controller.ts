import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateResourceDto } from '../../dto/resources/create-resource.dto';
import { CreateResourceCommand } from '../../../application/commands/resources/create-resource.command';
import { ResourceResponseDto } from '../../dto/resources/resource-response.dto';
import { FindResourcesQuery } from '../../../application/queries/resources/find-resources.query';
import ExceptionHandler from '../../../../../shared/exception/exception.handler';
import { FindOneResourceQuery } from '../../../application/queries/resources/find-one-resource.query';
import { UpdateResourceCommand } from '../../../application/commands/resources/update-resource.command';
import { UpdateResourceDto } from '../../dto/resources/update-resource.dto';
import { DeleteResourceCommand } from '../../../application/commands/resources/delete-resource.command';

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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResourceResponseDto | {}> {
    const resource = await this.queryBus.execute(new FindOneResourceQuery(id));

    return resource ? new ResourceResponseDto(resource.id, resource.name) : {};
  }

  @Post()
  async create(
    @Body() createResource: CreateResourceDto,
  ): Promise<ResourceResponseDto> {
    try {
      const resource = await this.commandBus.execute(
        new CreateResourceCommand(createResource.name),
      );

      return new ResourceResponseDto(resource.getId(), resource.getName());
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResource: UpdateResourceDto,
  ): Promise<ResourceResponseDto> {
    try {
      const resource = await this.commandBus.execute(
        new UpdateResourceCommand(id, updateResource.name),
      );

      return new ResourceResponseDto(resource.getId(), resource.getName());
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.commandBus.execute(new DeleteResourceCommand(id));

      return 'deleted';
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }
}
