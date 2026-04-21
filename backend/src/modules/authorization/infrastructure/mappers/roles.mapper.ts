import { Role } from '../../domain/entities/role.entity';
import { RoleTypeOrm } from '../entities/role.entity';

export class RolesMapper {
  static toDomain(roleTypeOrm: RoleTypeOrm): Role {
    return Role.fromPersistent(roleTypeOrm.id, roleTypeOrm.name);
  }

  static toModel(role: Role): RoleTypeOrm {
    const roleTypeOrm = new RoleTypeOrm();

    roleTypeOrm.id = role.getId();
    roleTypeOrm.name = role.getName();

    return roleTypeOrm;
  }
}
