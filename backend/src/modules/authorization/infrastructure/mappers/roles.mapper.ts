import { Role } from '../../domain/role-aggregate/role.aggregate';
import { RoleTypeOrm } from '../entities/role.entity';

export class RoleMappers {
  public static toDomain(roleTypeOrm: RoleTypeOrm): Role {
    return Role.fromPersistence(roleTypeOrm.id, roleTypeOrm.name, []);
  }

  public static toTypeOrm(role: Role): RoleTypeOrm {
    const roleTypeOrm = new RoleTypeOrm();

    roleTypeOrm.id = role.getId();
    roleTypeOrm.name = role.getName();

    return roleTypeOrm;
  }
}
