import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Client } from '../../clients/entities/client.entity';

export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ name: 'client_id', nullable: true })
  clientId: number;

  @ManyToOne(() => Client, client => client.users, { nullable: true })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.passwordHash) {
      this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.passwordHash);
  }
}
