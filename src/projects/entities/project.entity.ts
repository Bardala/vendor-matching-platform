import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Service } from '../../services/entities/service.entity';
import { Match } from '../../matches/entities/match.entity';

export enum ProjectStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'client_id' })
  clientId: number;

  @ManyToOne(() => Client, client => client.projects)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ type: 'json' })
  country: string; // Store as JSON string, can be parsed to object

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  budget: number;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PENDING,
  })
  status: ProjectStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Service)
  @JoinTable({
    name: 'project_services',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
  })
  servicesNeeded: Service[];

  @OneToMany(() => Match, match => match.project)
  matches: Match[];
}
