import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('resources')
export class ResourceTypeOrm {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;
}
