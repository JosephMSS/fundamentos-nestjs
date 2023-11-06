import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserCustomer1699289075816 implements MigrationInterface {
  name = 'CreateUserCustomer1699289075816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "customer" ("id" character varying NOT NULL, "name" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "phone" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "customerId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce" UNIQUE ("customerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customerId"`);
    await queryRunner.query(`DROP TABLE "customer"`);
  }
}
