import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountsTable1792659578383 implements MigrationInterface {
  name = 'CreateAccountsTable1792659578383';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."account_status_enum" AS ENUM('ACTIVE', 'FROZEN', 'CLOSED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "account_number" character varying(20) NOT NULL, "currency" character(3) NOT NULL DEFAULT 'IDR', "balance_minor_units" bigint NOT NULL DEFAULT '0', "status" "public"."account_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "CHK_accounts_balance_nonnegative" CHECK ("balance_minor_units" >= 0), CONSTRAINT "CHK_accounts_currency_idr" CHECK ("currency" = 'IDR'), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_accounts_user_id" ON "accounts"  ("user_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_accounts_account_number" ON "accounts"  ("account_number") `,
    );
    await queryRunner.query(
      `ALTER TABLE "accounts" ADD CONSTRAINT "FK_accounts_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts" DROP CONSTRAINT "FK_accounts_user_id"`,
    );
    await queryRunner.query(`DROP INDEX "public"."UQ_accounts_account_number"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_accounts_user_id"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
    await queryRunner.query(`DROP TYPE "public"."account_status_enum"`);
  }
}
