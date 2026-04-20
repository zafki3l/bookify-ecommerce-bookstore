import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('roles')
export class RoleTypeOrm {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;
}
