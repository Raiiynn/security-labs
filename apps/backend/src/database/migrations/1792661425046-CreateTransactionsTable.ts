import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionsTable1792661425046 implements MigrationInterface {
  name = 'CreateTransactionsTable1792661425046';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "idempotency_key" uuid NOT NULL, "source_account_id" uuid NOT NULL, "destination_account_id" uuid NOT NULL, "amount_minor_units" bigint NOT NULL, "currency" character(3) NOT NULL DEFAULT 'IDR', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "CHK_transactions_currency_idr" CHECK ("currency" = 'IDR'), CONSTRAINT "CHK_transactions_amount_positive" CHECK ("amount_minor_units" > 0), CONSTRAINT "CHK_transactions_distinct_accounts" CHECK ("source_account_id" <> "destination_account_id"), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_transactions_created_at" ON "transactions"  ("created_at") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_transactions_destination_account_id" ON "transactions"  ("destination_account_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_transactions_source_account_id" ON "transactions"  ("source_account_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_transactions_idempotency_key" ON "transactions"  ("idempotency_key") `,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_transactions_source_account_id" FOREIGN KEY ("source_account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_transactions_destination_account_id" FOREIGN KEY ("destination_account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_transactions_destination_account_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_transactions_source_account_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_transactions_idempotency_key"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_transactions_source_account_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_transactions_destination_account_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_transactions_created_at"`,
    );
    await queryRunner.query(`DROP TABLE "transactions"`);
  }
}
