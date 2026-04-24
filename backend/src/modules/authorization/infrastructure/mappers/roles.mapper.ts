import { Role } from '../../domain/role-aggregate/role.aggregate';
import { RoleTypeOrm } from '../entities/role.entity';

export class RoleMappers {
  public static toDomain(roleTypeOrm: RoleTypeOrm): Role {
    const permissions =
      roleTypeOrm.rolePermissions?.map((rp) => rp.permissionId) ?? [];

    return Role.fromPersistence(roleTypeOrm.id, roleTypeOrm.name, permissions);
  }

  public static toTypeOrm(role: Role): RoleTypeOrm {
    const roleTypeOrm = new RoleTypeOrm();

    roleTypeOrm.id = role.getId();
    roleTypeOrm.name = role.getName();

    return roleTypeOrm;
  }
}
