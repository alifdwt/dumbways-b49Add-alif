import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1696756210174 implements MigrationInterface {
    name = 'MyMigration1696756210174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "voters" ("id" SERIAL NOT NULL, "voter_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "paslonId" integer, CONSTRAINT "PK_a58842a42a7c48bc3efebb0a305" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslons" ("id" SERIAL NOT NULL, "name" character varying, "vision" character varying NOT NULL, "image" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb7268cc991dfa9da1aa9c02941" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parties" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "paslonId" integer, CONSTRAINT "PK_da698299dca60d55f0050dde935" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "voters" ADD CONSTRAINT "FK_9339a9999327e10d962c491d2d1" FOREIGN KEY ("paslonId") REFERENCES "paslons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parties" ADD CONSTRAINT "FK_7a69f13a869d8876a1c7b9f340a" FOREIGN KEY ("paslonId") REFERENCES "paslons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parties" DROP CONSTRAINT "FK_7a69f13a869d8876a1c7b9f340a"`);
        await queryRunner.query(`ALTER TABLE "voters" DROP CONSTRAINT "FK_9339a9999327e10d962c491d2d1"`);
        await queryRunner.query(`DROP TABLE "parties"`);
        await queryRunner.query(`DROP TABLE "paslons"`);
        await queryRunner.query(`DROP TABLE "voters"`);
    }

}
