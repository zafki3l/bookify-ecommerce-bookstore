import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RolePermissionTypeOrm } from './role-permission.entity';

@Entity('roles')
export class RoleTypeOrm {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @OneToMany(() => RolePermissionTypeOrm, (rp) => rp.role)
  rolePermissions!: RolePermissionTypeOrm[];
}
