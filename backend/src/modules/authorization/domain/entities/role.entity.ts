import { RoleNameEmptyException } from '../exceptions/roles/role-name-empty.exception';
import { RoleNameTooLongException } from '../exceptions/roles/role-name-too-long.exception';

export class Role {
  private static readonly MAX_LENGTH = 50;

  private constructor(
    private id: string,
    private name: string,
  ) {}

  static create(name: string): Role {
    if (!name) {
      throw new RoleNameEmptyException();
    }

    if (name.length > Role.MAX_LENGTH) {
      throw new RoleNameTooLongException();
    }

    const normalized = name.trim().toLowerCase();
    const formattedName =
      normalized.charAt(0).toUpperCase() + normalized.slice(1);

    const id = normalized;

    return new Role(id, formattedName);
  }

  static fromPersistent(id: string, name: string): Role {
    return new Role(id, name);
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  updateName(name: string): void {
    if (!name) {
      throw new RoleNameEmptyException();
    }

    if (name.length > Role.MAX_LENGTH) {
      throw new RoleNameTooLongException();
    }

    const normalized = name.trim().toLowerCase();
    const formattedName =
      normalized.charAt(0).toUpperCase() + normalized.slice(1);

    this.name = formattedName;
  }
}
