export class CreatePermissionDto {
  constructor(
    public resourceId: string,
    public actionId: string,
  ) {}
}
