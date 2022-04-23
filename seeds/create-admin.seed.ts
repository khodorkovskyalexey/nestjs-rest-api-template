import { Admin } from 'src/admins/entities';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const admins = await connection.getRepository(Admin).createQueryBuilder().getMany();

    if (admins.length) return;

    await factory(Admin)().create({
      email: 'admin@email.com',
      password: 'admin@email.com',
    });
  }
}
