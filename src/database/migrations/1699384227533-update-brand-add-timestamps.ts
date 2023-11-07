import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBrandAddTimestamps1699384227533
  implements MigrationInterface
{
  name = 'UpdateBrandAddTimestamps1699384227533';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "brand" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "created_at"`);
  }
}
