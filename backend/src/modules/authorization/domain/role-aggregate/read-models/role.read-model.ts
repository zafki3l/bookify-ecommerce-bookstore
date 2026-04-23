export class RoleReadModel {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly permissions: string[],
  ) {}
}
