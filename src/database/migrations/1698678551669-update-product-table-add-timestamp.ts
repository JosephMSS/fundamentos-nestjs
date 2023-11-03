import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductTableAddTimestamp1698678551669
  implements MigrationInterface
{
  name = 'UpdateProductTableAddTimestamp1698678551669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "created_at"`);
  }
}
