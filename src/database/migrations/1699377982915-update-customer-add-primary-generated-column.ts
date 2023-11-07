import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCustomerAddPrimaryGeneratedColumn1699377982915
  implements MigrationInterface
{
  name = 'UpdateCustomerAddPrimaryGeneratedColumn1699377982915';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customerId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "customerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce" UNIQUE ("customerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "customer" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`,
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
      `ALTER TABLE "customer" DROP CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32"`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customerId"`);
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
}
