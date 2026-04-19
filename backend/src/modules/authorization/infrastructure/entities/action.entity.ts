import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('actions')
export class ActionTypeOrm {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  name!: string;
}
