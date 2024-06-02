// Entities
import { User } from '../../../src/modules/user/user.entity';

// Mocks
import { mockUsersList } from '../user/user.service';

// Enums
import { EnumRoles } from '../../../src/common/enums';

// Utils
import { ObjectUtils } from '../../../src/utils/object-utils';

export class AuthService {
  public async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = mockUsersList.find(
      (user) => user.email === email && user.password === password,
    );

    if (user) {
      return Promise.resolve(ObjectUtils.omit(user, ['password']));
    }

    return Promise.resolve(null);
  }

  public login(user: User): { access_token: string } {
    return {
      access_token:
        user.role === EnumRoles.ADMIN ? 'admin_token' : 'user_token',
    };
  }
}
