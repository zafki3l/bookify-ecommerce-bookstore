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
@Unique(['resource_id', 'action_id'])
export class PermissionTypeOrm {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id!: string;

  @Column()
  resource_id!: string;

  @Column()
  action_id!: string;

  @ManyToOne(() => ResourceTypeOrm)
  @JoinColumn({ name: 'resource_id' })
  resource!: ResourceTypeOrm;

  @ManyToOne(() => ActionTypeOrm)
  @JoinColumn({ name: 'action_id' })
  action!: ActionTypeOrm;
}
