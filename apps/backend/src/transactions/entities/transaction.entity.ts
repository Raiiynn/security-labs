import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  type Relation,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Account } from '../../accounts/entities/account.entity.js';

@Entity({ name: 'transactions' })
@Index('UQ_transactions_idempotency_key', ['idempotencyKey'], {
  unique: true,
})
@Index('IDX_transactions_source_account_id', ['sourceAccountId'])
@Index('IDX_transactions_destination_account_id', ['destinationAccountId'])
@Index('IDX_transactions_created_at', ['createdAt'])
@Check(
  'CHK_transactions_distinct_accounts',
  '"source_account_id" <> "destination_account_id"',
)
@Check('CHK_transactions_amount_positive', '"amount_minor_units" > 0')
@Check('CHK_transactions_currency_idr', `"currency" = 'IDR'`)
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    name: 'idempotency_key',
    type: 'uuid',
  })
  idempotencyKey!: string;

  @Column({
    name: 'source_account_id',
    type: 'uuid',
  })
  sourceAccountId!: string;

  @ManyToOne(() => Account, (account) => account.outgoingTransactions, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'source_account_id',
    foreignKeyConstraintName: 'FK_transactions_source_account_id',
  })
  sourceAccount!: Relation<Account>;

  @Column({
    name: 'destination_account_id',
    type: 'uuid',
  })
  destinationAccountId!: string;

  @ManyToOne(() => Account, (account) => account.incomingTransactions, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'destination_account_id',
    foreignKeyConstraintName: 'FK_transactions_destination_account_id',
  })
  destinationAccount!: Relation<Account>;

  @Column({
    name: 'amount_minor_units',
    type: 'bigint',
  })
  amountMinorUnits!: string;

  @Column({
    type: 'char',
    length: 3,
    default: 'IDR',
  })
  currency!: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt!: Date;
}
