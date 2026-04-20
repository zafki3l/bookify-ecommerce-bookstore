import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('roles')
export class RolesController {
  @Get()
  findAll() {
    return 'ligma sigma';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Post()
  create() {}

  @Patch(':id')
  update(@Param('id') id: string) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {}
}
