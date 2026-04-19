import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateActionDto } from '../../dto/actions/create-action.dto';
import ExceptionHandler from '../../../../../shared/exceptions/exception.handler';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateActionCommand } from '../../../application/commands/actions/create-action.command';
import { ActionResponseDto } from '../../dto/actions/action-response.dto';

@Controller('actions')
export class ActionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  findAll() {
    return 'Actions';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Action ${id}`;
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
}
