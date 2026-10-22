import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1792657263539 implements MigrationInterface {
  name = 'CreateUsersTable1792657263539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "email" character varying(254) NOT NULL, "password_hash" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "CHK_users_email_lowercase" CHECK ("email" = lower("email")), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_users_email" ON "users"  ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."UQ_users_email"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
