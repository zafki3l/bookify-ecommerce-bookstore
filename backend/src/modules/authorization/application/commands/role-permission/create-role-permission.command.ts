export class CreateRolePermissionCommand {
  constructor(
    public roleId: string,
    public permissionId: string,
  ) {}
}
