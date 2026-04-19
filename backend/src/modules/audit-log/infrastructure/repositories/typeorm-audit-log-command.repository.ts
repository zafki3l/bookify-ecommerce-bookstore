import { Injectable } from '@nestjs/common';
import { IAuditLogCommandRepository } from '../../domain/repositories/audit-log-command.repository.interface';
import { AuditLog } from '../../domain/entities/audit-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLogTypeOrm } from '../entities/typeorm-auditlog.entity';
import { Repository } from 'typeorm';
import { AuditLogMapper } from '../mappers/audit-log.mapper';

@Injectable()
export class TypeOrmAuditLogCommandRepository implements IAuditLogCommandRepository {
  constructor(
    @InjectRepository(AuditLogTypeOrm)
    private readonly repository: Repository<AuditLogTypeOrm>,
  ) {}

  async save(auditlog: AuditLog): Promise<void> {
    await this.repository.save(AuditLogMapper.toTypeOrm(auditlog));
  }
}
