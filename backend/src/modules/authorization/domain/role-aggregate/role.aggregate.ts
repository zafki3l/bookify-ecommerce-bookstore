import { Action } from '../permission-aggregate/enums/action.enum';
import { Resource } from '../permission-aggregate/enums/resource.enum';
import { PermissionAlreadyGrantedException } from './exceptions/permission-already-granted.exception';
import { PermissionNotFoundException } from './exceptions/permission-not-found.exception';
import { RoleNameEmptyException } from './exceptions/role-name-empty.exception';
import { RoleNameTooLongException } from './exceptions/role-name-too-long.exception';

export class Role {
  private static readonly MAX_NAME_LENGTH = 50;

  private constructor(
    private readonly id: string,
    private name: string,
    private permissions: string[],
  ) {}

  public static create(name: string): Role {
    const formated = name.trim().toLowerCase();

    if (!formated) {
      throw new RoleNameEmptyException();
    }

    if (formated.length > Role.MAX_NAME_LENGTH) {
      throw new RoleNameTooLongException();
    }

    const id = formated.replace(/\s+/g, '-'); // "Super Admin" -> "super-admin"

    const newName = formated.charAt(0).toUpperCase() + formated.slice(1);
    return new Role(id, newName, []);
  }

  public static fromPersistence(
    id: string,
    name: string,
    permissions: string[],
  ): Role {
    return new Role(id, name, permissions);
  }

  public rename(name: string): void {
    if (!name || !name.trim()) {
      throw new RoleNameEmptyException();
    }

    if (name.length > Role.MAX_NAME_LENGTH) {
      throw new RoleNameTooLongException();
    }

    const formated = name.trim().toLowerCase();
    const newName = formated.charAt(0).toUpperCase() + formated.slice(1);

    this.name = newName;
  }

  public grantPermission(permission: string): void {
    const isExists = this.permissions.some((p) => p === permission);
    if (isExists) {
      throw new PermissionAlreadyGrantedException(permission);
    }

    this.permissions.push(permission);
  }

  public revokePermission(permission: string): void {
    const isExists = this.permissions.find((p) => p === permission);
    if (!isExists) {
      throw new PermissionNotFoundException(permission);
    }

    this.permissions = this.permissions.filter((p) => !(p === permission));
  }

  public hasPermission(permission): boolean {
    return this.permissions.some((p) => p === permission);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPermissions(): string[] {
    return [...this.permissions];
  }
}
