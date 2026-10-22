import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from '../../accounts/entities/account.entity.js';

@Entity({ name: 'users' })
@Check('CHK_users_email_lowercase', '"email" = lower("email")')
@Index('UQ_users_email', ['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 254,
  })
  email!: string;

  @Column({
    name: 'password_hash',
    type: 'varchar',
    length: 255,
    select: false,
  })
  passwordHash!: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @OneToMany(() => Account, (account) => account.user)
  accounts!: Relation<Account[]>;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt!: Date;
}
