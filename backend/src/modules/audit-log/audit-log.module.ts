import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogTypeOrm } from './infrastructure/entities/typeorm-auditlog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogTypeOrm])],
})
export class AuditLogModule {}
