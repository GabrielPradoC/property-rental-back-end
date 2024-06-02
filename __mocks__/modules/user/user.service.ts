// Entities
import { User } from '../../../src/modules/user/user.entity';

// Enums
import { EnumRoles } from '../../../src/common/enums';

const mockUsersList: Omit<User, 'beforeInsert'>[] = [
  {
    id: '037dfdd5-5a2b-46b8-9fe9-3b27975bd0bb',
    name: 'Admin',
    phoneNumber: '123456789',
    email: 'admin@email.com',
    password: 'admin_password',
    role: EnumRoles.ADMIN,
    createdAt: new Date('2023-05-21T22:12:24.382Z'),
    updatedAt: new Date('2023-05-21T22:12:24.382Z'),
  },
  {
    id: '9c061d1f-03eb-497c-82da-1e3f29231c03',
    name: 'User',
    phoneNumber: '123456789',
    email: 'user@email.com',
    password: 'user_password',
    role: EnumRoles.USER,
    createdAt: new Date('2023-05-21T22:12:24.382Z'),
    updatedAt: new Date('2023-05-21T22:12:24.382Z'),
  },
];

class UserService {
  public async findByEmail(email: string): Promise<User> {
    const user = mockUsersList.find((user) => user.email === email);
    if (!user) {
      throw new Error();
    }
    return Promise.resolve(user) as Promise<User>;
  }
}

export { UserService, mockUsersList };
