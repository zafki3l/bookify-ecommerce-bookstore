import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogTypeOrm } from './infrastructure/entities/typeorm-auditlog.entity';
import { UuidModule } from '../../shared/uuid/uuid.module';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogTypeOrm]), UuidModule],
})
export class AuditLogModule {}
