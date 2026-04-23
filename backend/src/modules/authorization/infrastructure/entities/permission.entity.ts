import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity('permissions')
@Unique(['resource', 'action'])
export class PermissionTypeOrm {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  resource!: string;

  @Column({ type: 'varchar', length: 50 })
  action!: string;
}
