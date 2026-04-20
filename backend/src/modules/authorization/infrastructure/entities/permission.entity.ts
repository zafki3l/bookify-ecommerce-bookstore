import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { ResourceTypeOrm } from './resource.entity';
import { ActionTypeOrm } from './action.entity';

@Entity('permissions')
@Unique(['resourceId', 'actionId'])
export class PermissionTypeOrm {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id!: string;

  @Column({ type: 'varchar', length: 50 })
  resourceId!: string;

  @Column({ type: 'varchar', length: 50 })
  actionId!: string;

  @ManyToOne(() => ResourceTypeOrm)
  @JoinColumn({ name: 'resourceId' })
  resource!: ResourceTypeOrm;

  @ManyToOne(() => ActionTypeOrm)
  @JoinColumn({ name: 'actionId' })
  action!: ActionTypeOrm;
}
