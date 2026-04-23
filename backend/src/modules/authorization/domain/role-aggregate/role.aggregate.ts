import { Action } from '../enums/action.enum';
import { Resource } from '../enums/resource.enum';
import { PermissionAlreadyGrantedException } from './exceptions/permission-already-granted.exception';
import { PermissionNotFoundException } from './exceptions/permission-not-found.exception';
import { RoleNameEmptyException } from './exceptions/role-name-empty.exception';
import { RoleNameTooLongException } from './exceptions/role-name-too-long.exception';
import { Permission } from './entities/permission.entity';

export class Role {
  private static readonly MAX_NAME_LENGTH = 50;

  private constructor(
    private readonly id: string,
    private name: string,
    private permissions: Permission[],
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
    permissions: Permission[],
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

  public grantPermission(resource: Resource, action: Action): void {
    const isExists = this.permissions.some(
      (permission) =>
        permission.getResource() === resource &&
        permission.getAction() === action,
    );
    if (isExists) {
      throw new PermissionAlreadyGrantedException(`${resource}.${action}`);
    }

    this.permissions.push(Permission.create(resource, action));
  }

  public revokePermission(resource: Resource, action: Action): void {
    const exists = this.permissions.find(
      (p) => p.getResource() === resource && p.getAction() === action,
    );
    if (!exists) {
      throw new PermissionNotFoundException(`${resource}.${action}`);
    }

    this.permissions = this.permissions.filter(
      (permission) =>
        !(
          permission.getResource() === resource &&
          permission.getAction() === action
        ),
    );
  }

  public hasPermission(permissionId): boolean {
    return this.permissions.some(
      (permission) => permission.getId() === permissionId,
    );
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPermissions(): Permission[] {
    return [...this.permissions];
  }
}
