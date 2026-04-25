import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoleTypeOrm } from './role.entity';
import { PermissionTypeOrm } from './permission.entity';

@Entity('role_permission')
export class RolePermissionTypeOrm {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  roleId!: string;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  permissionId!: string;

  @ManyToOne(() => RoleTypeOrm)
  @JoinColumn({ name: 'roleId' })
  role!: RoleTypeOrm;

  @ManyToOne(() => PermissionTypeOrm)
  @JoinColumn({ name: 'permissionId' })
  permission!: PermissionTypeOrm;
}
