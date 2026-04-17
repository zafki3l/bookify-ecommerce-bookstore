import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('resources')
export class Resource {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;
}
