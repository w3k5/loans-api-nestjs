import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1628436891544 implements MigrationInterface {
  name = 'migration1628436891544';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "loans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bank" character varying NOT NULL, "loanName" character varying NOT NULL, "loan" integer NOT NULL, CONSTRAINT "PK_5c6942c1e13e4de135c5203ee61" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "image" character varying, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "loans"`);
  }
}
