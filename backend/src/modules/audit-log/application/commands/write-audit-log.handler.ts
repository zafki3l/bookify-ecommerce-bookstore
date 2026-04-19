import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WriteAuditLogCommand } from './write-audit-log.command';

@CommandHandler(WriteAuditLogCommand)
export class WriteAuditLogHandler implements ICommandHandler<WriteAuditLogCommand> {
  constructor() {}

  async execute(command: WriteAuditLogCommand) {}
}
