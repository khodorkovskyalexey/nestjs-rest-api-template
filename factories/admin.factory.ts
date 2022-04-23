import Faker from 'faker';
import { Admin } from 'src/admins/entities';
import { define } from 'typeorm-seeding';

const DEFUALT_ADMIN_PASSWORD = 'Password123';

define(Admin, (faker: typeof Faker) => {
  const admin = new Admin();

  admin.email = faker.internet.email();
  admin.password = DEFUALT_ADMIN_PASSWORD;
  admin.firstName = faker.name.firstName();
  admin.lastName = faker.name.lastName();

  return admin;
});
