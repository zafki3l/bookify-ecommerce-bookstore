export interface IAuditLogCommandRepository {
  write(
    action: string,
    performedBy: string,
    module: string,
    resource: string,
    metadata?: object,
  ): Promise<void>;
}

export const AUDIT_LOG_COMMAND_REPOSITORY = 'IAuditLogCommandRepository';
