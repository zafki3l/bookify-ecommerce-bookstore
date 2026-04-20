export class CreatePermissionCommand {
  constructor(
    public readonly resourceId: string,
    public readonly actionId: string,
  ) {}
}
