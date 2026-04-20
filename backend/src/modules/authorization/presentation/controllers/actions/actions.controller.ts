import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateActionDto } from '../../dto/actions/create-action.dto';
import ExceptionHandler from '../../../../../shared/exception/exception.handler';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateActionCommand } from '../../../application/commands/actions/create-action.command';
import { ActionResponseDto } from '../../dto/actions/action-response.dto';
import { FindActionsQuery } from '../../../application/queries/actions/find-actions-query';
import { FindOneActionQuery } from '../../../application/queries/actions/find-one-action.query';
import { UpdateActionDto } from '../../dto/actions/update-action.dto';

@Controller('actions')
export class ActionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findAll(): Promise<ActionResponseDto[]> {
    const actions = await this.queryBus.execute(new FindActionsQuery());

    return actions
      ? actions.map((action) => new ActionResponseDto(action.id, action.name))
      : [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const action = await this.queryBus.execute(new FindOneActionQuery(id));

    return new ActionResponseDto(action.id, action.name);
  }

  @Post()
  async create(@Body() createAction: CreateActionDto) {
    try {
      const action = await this.commandBus.execute(
        new CreateActionCommand(createAction.name),
      );

      return new ActionResponseDto(action.getId(), action.getName());
    } catch (error) {
      ExceptionHandler.handle(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAction: UpdateActionDto,
  ) {}

  @Delete(':id')
  async remove(@Param('id') id: string) {}
}
