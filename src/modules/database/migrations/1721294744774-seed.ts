import { Department } from 'src/modules/departments/entities/department.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed1721294744774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      queryRunner.manager.getRepository(Department).create([
        { name: 'IT', description: 'Information Technology', created_at: new Date(), updated_at: new Date() },
        { name: 'HR', description: 'Human Resources', created_at: new Date(), updated_at: new Date() },
        { name: 'Finance', description: 'Finance Department', created_at: new Date(), updated_at: new Date() }
      ])
    );

    await queryRunner.manager.save(
      queryRunner.manager.getRepository(Role).create([
        { name: 'admin', created_at: new Date(), updated_at: new Date() },
        { name: 'user', created_at: new Date(), updated_at: new Date() }
      ])
    );

    await queryRunner.manager.save(
      queryRunner.manager.getRepository(User).create([
        {
          email: 'admin@admin.com',
          first_name: 'Admin',
          name: 'Admin',
          last_name: 'Admin',
          password: '$2a$10$t.2p8hUuM5FMFK0xxGVcD.Bi5NqkuENf5Yf4aOFk4Pc5.jpOScJZu',
          created_at: new Date(),
          updated_at: new Date(),
          phone_number: '+243079265726',
          address: '11, avenue des huileries, Kinshasa, Gombe',
          verified_at: new Date(),
          roles: [{ id: 1 }],
          departments: [{ id: 1 }, { id: 2 }]
        }
      ])
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE * FROM role');
    await queryRunner.query('DELETE * FROM user');
  }
}
