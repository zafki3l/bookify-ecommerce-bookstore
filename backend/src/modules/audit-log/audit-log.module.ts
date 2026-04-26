import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogTypeOrm } from './infrastructure/entities/typeorm-auditlog.entity';
import { UuidModule } from '../../shared/uuid/uuid.module';
import { AUDIT_LOG_COMMAND_REPOSITORY } from './domain/audit-log-aggregate/repositories/audit-log-command.repository.interface';
import { TypeOrmAuditLogCommandRepository } from './infrastructure/repositories/audit-log/typeorm-audit-log-command.repository';
import { UnitOfWorkModule } from '../../shared/unit-of-work/unit-of-work.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLogTypeOrm]),
    UuidModule,
    UnitOfWorkModule,
  ],
  providers: [
    {
      provide: AUDIT_LOG_COMMAND_REPOSITORY,
      useClass: TypeOrmAuditLogCommandRepository,
    },
  ],
  exports: [AUDIT_LOG_COMMAND_REPOSITORY],
})
export class AuditLogModule {}
