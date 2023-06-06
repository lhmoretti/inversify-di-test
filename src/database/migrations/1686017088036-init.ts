import { MigrationInterface, QueryRunner } from "typeorm";

export class init1686017088036 implements MigrationInterface {
    name = 'init1686017088036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(150) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying NOT NULL, "branch_owner" boolean NOT NULL DEFAULT false, "phone" character varying(30), "name" character varying(150), "surname" character varying(150), "avatar" character varying, "recpass" character varying(6), "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "active" boolean NOT NULL DEFAULT true, "address" character varying(150), "roleId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
