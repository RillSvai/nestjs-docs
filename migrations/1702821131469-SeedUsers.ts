import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1702821131469 implements MigrationInterface {
  private readonly logger = new Logger(SeedUsers1702821131469.name);
  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('Up');
    await queryRunner.query(
      "INSERT INTO public.user VALUES (1,'John', 'qwerty'), (2,'Vika','asdfgh')",
    );
  }

  public async down(): Promise<void> {
    this.logger.log('Down');
  }
}
