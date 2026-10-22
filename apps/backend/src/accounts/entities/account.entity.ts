import { AccountStatus } from '../enums/account-status.enum.js';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from '../../transactions/entities/transaction.entity.js';
import { User } from '../../users/entities/user.entity.js';

@Entity({ name: 'accounts' })
@Index('UQ_accounts_account_number', ['accountNumber'], { unique: true })
@Index('IDX_accounts_user_id', ['userId'])
@Check('CHK_accounts_currency_idr', `"currency" = 'IDR'`)
@Check('CHK_accounts_balance_nonnegative', '"balance_minor_units" >= 0')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
  })
  userId!: string;

  @ManyToOne(() => User, (user) => user.accounts, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'user_id',
    foreignKeyConstraintName: 'FK_accounts_user_id',
  })
  user!: Relation<User>;

  @Column({
    name: 'account_number',
    type: 'varchar',
    length: 20,
  })
  accountNumber!: string;

  @Column({
    type: 'char',
    length: 3,
    default: 'IDR',
  })
  currency!: string;

  @OneToMany(() => Transaction, (transaction) => transaction.sourceAccount)
  outgoingTransactions!: Relation<Transaction[]>;

  @OneToMany(() => Transaction, (transaction) => transaction.destinationAccount)
  incomingTransactions!: Relation<Transaction[]>;

  @Column({
    name: 'balance_minor_units',
    type: 'bigint',
    default: 0,
  })
  balanceMinorUnits!: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: AccountStatus,
    enumName: 'account_status_enum',
    default: AccountStatus.Active,
  })
  status!: AccountStatus;

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
