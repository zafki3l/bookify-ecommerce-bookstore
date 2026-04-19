import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WriteAuditLogCommand } from './write-audit-log.command';
import { Inject } from '@nestjs/common';
import {
  AUDIT_LOG_COMMAND_REPOSITORY,
  type IAuditLogCommandRepository,
} from '../../domain/repositories/audit-log-command.repository.interface';
import {
  type IUuidGenerator,
  UUID_GENERATOR,
} from '../../../../shared/uuid/domain/uuid-generator.interface';
import { AuditLog } from '../../domain/entities/audit-log.entity';

@CommandHandler(WriteAuditLogCommand)
export class WriteAuditLogHandler implements ICommandHandler<WriteAuditLogCommand> {
  constructor(
    @Inject(AUDIT_LOG_COMMAND_REPOSITORY)
    private readonly repository: IAuditLogCommandRepository,

    @Inject(UUID_GENERATOR)
    private readonly uuid: IUuidGenerator,
  ) {}

  async execute(command: WriteAuditLogCommand): Promise<void> {
    const id = this.uuid.generate();

    const auditLog = AuditLog.create(
      id,
      command.action,
      command.module,
      command.resourceId,
      command.performedBy,
      command.metadata,
    );

    await this.repository.save(auditLog);
  }
}
