import { MigrationInterface, QueryRunner } from 'typeorm';

import { User } from '../modules/user/user.entity';

import { EnumRoles } from '../common/enums';

export class CreateAdminUser1715715725043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = {
      name: 'Test User',
      phoneNumber: '',
      email: 'test@email.com',
      password: '$2b$10$Th6H92sv6X9ZoAbpNuWszeS/8LuEZDMovsCguJ9M2qTWrQGiBPUjq',
      role: EnumRoles.ADMIN,
    };

    await queryRunner.manager.insert(User, user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(User, { email: 'test@email.com' });
  }
}
