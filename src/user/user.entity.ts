import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organization } from '../organization/organization.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  role: string;

  @Column({ type: 'uuid', nullable: true })
  organizationId: string;

  @ManyToOne(() => Organization, (organization) => organization.users, {
    nullable: true,
  })
  organization: Organization;
}
