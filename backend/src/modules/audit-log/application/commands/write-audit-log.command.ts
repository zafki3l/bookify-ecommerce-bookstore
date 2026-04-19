export class WriteAuditLogCommand {
  constructor(
    public readonly action: string,
    public readonly module: string,
    public readonly resourceId: string,
    public readonly performedBy: string,
    public readonly metadata?: Record<string, any>,
  ) {}
}
