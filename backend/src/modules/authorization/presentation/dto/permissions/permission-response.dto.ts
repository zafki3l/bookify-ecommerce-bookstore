export class PermissionResponseDto {
  constructor(
    public id: string,
    public resourceId: string,
    public actionId: string,
  ) {}
}
