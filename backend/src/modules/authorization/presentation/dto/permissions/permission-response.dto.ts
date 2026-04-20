export class PermissionResponseDto {
  constructor(
    public id: string,
    public resource_id: string,
    public action_id: string,
  ) {}
}
