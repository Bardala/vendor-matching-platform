import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { Match } from '../../matches/entities/match.entity';

@Entity('vendors')
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'countries_supported', type: 'json' })
  countriesSupported: string[]; // Store as JSON array

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  rating: number;

  @Column({ name: 'response_sla_hours' })
  responseSlaHours: number;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Service)
  @JoinTable({
    name: 'vendor_services',
    joinColumn: { name: 'vendor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
  })
  servicesOffered: Service[];

  @OneToMany(() => Match, match => match.vendor)
  matches: Match[];
}
