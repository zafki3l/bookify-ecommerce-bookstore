export class CreatePermissionDto {
  constructor(
    public resource_id: string,
    public action_id: string,
  ) {}
}
