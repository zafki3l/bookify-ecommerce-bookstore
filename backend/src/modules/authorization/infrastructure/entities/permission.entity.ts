import { Column, Entity, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { RolePermissionTypeOrm } from './role-permission.entity';

@Entity('permissions')
@Unique(['resource', 'action'])
export class PermissionTypeOrm {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  resource!: string;

  @Column({ type: 'varchar', length: 50 })
  action!: string;

  @OneToMany(() => RolePermissionTypeOrm, (rp) => rp.permission)
  rolePermissions!: RolePermissionTypeOrm[];
}
