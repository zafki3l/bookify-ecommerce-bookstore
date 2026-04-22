export class DeleteRolePermissionCommand {
  constructor(
    public roleId: string,
    public permissionId: string,
  ) {}
}
