import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Vendor } from '../../vendors/entities/vendor.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'project_id' })
  projectId: number;

  @ManyToOne(() => Project, project => project.matches)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'vendor_id' })
  vendorId: number;

  @ManyToOne(() => Vendor, vendor => vendor.matches)
  @JoinColumn({ name: 'vendor_id' })
  vendor: Vendor;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  score: number;

  @Column({ name: 'is_notified', default: false })
  isNotified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
