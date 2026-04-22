export class CreateRolePermissionDto {
  constructor(
    public roleId: string,
    public permissionId: string,
  ) {}
}
