import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1695720741405 implements MigrationInterface {
    name = 'MyMigration1695720741405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pemilu" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "vision" character varying NOT NULL, "image" character varying, "posted_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ca3b9941eb997cdf81c5be9996d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pemilu"`);
    }

}
