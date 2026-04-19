import { AuditLogActionEmptyException } from '../exceptions/audit-log-action-empty.exception';
import { AuditLogIdEmptyException } from '../exceptions/audit-log-id-empty.exception';
import { AuditLogModuleEmptyException } from '../exceptions/audit-log-module-empty.exception';
import { AuditLogPerfomedByEmptyException } from '../exceptions/audit-log-performed-by-empty.exception';
import { AuditLogResourceIdEmptyException } from '../exceptions/audit-log-resource-id-empty.exception';

export class AuditLog {
  private constructor(
    private id: string,
    private action: string,
    private module: string,
    private resourceId: string,
    private perfomedBy: string,
    private metadata: Record<string, any> | null,
  ) {}

  static create(
    id: string,
    action: string,
    module: string,
    resourceId: string,
    perfomedBy: string,
    metadata: Record<string, any> | null,
  ): AuditLog {
    if (!id) {
      throw new AuditLogIdEmptyException();
    }

    if (!action) {
      throw new AuditLogActionEmptyException();
    }

    if (!module) {
      throw new AuditLogModuleEmptyException();
    }

    if (!resourceId) {
      throw new AuditLogResourceIdEmptyException();
    }

    if (!perfomedBy) {
      throw new AuditLogPerfomedByEmptyException();
    }

    return new AuditLog(id, action, module, resourceId, perfomedBy, metadata);
  }

  getId(): string {
    return this.id;
  }

  getAction(): string {
    return this.action;
  }

  getModule(): string {
    return this.module;
  }

  getResourceId(): string {
    return this.resourceId;
  }

  getPerfomedBy(): string {
    return this.perfomedBy;
  }

  getMetadata(): Record<string, any> | null {
    return this.metadata;
  }
}
