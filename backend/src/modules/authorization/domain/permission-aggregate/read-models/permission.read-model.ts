export class PermissionReadModel {
  public constructor(
    public readonly id: string,
    public readonly resource: string,
    public readonly action: string,
  ) {}
}
