import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { List } from '../list/list.entity';
import { Organization } from '../organization/organization.entity';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column('text')
  content: string;

  @ManyToOne(() => List, (list) => list.id)
  list: List;

  @ManyToOne(() => Organization, (organization) => organization.id)
  organization: Organization;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
