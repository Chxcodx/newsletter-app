import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organization } from '../organization/organization.entity';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  custom_fields: any;

  @Column({ type: 'text', nullable: true })
  gpg_public_key: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Organization, (organization) => organization.subscribers, {
    nullable: true,
  })
  organization: Organization;
}
