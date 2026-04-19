import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogTypeOrm } from './infrastructure/entities/typeorm-auditlog.entity';
import { AUDIT_LOG_COMMAND_REPOSITORY } from './domain/repositories/audit-log-command.repository.interface';
import { TypeOrmAuditLogCommandRepository } from './infrastructure/repositories/typeorm-audit-log-command.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogTypeOrm])],
  providers: [
    {
      provide: AUDIT_LOG_COMMAND_REPOSITORY,
      useClass: TypeOrmAuditLogCommandRepository,
    },
  ],
  exports: [AUDIT_LOG_COMMAND_REPOSITORY],
})
export class AuditLogModule {}
