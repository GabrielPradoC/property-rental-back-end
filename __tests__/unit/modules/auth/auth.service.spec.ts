// Libs
import { INestApplication } from '@nestjs/common';

// Services
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../../../../src/modules/auth/auth.service';
import {
  UserService,
  mockUsersList,
} from '../../../../__mocks__/modules/user/user.service';

// Utils
import { TestUtils } from '../../../test-utils';

// Mocks
jest.mock('../../../../src/modules/user/user.service', () => {
  return jest.requireActual('../../../../__mocks__/modules/user/user.service');
});

jest.mock('@nestjs/jwt', () => {
  return jest.requireActual('../../../../__mocks__/libs/@nestjs/jwt');
});

describe('AuthService', () => {
  // Configuration
  let app: INestApplication<any>;
  let sut: AuthService;

  beforeAll(async () => {
    app = await TestUtils.createApp({
      providers: [AuthService, UserService, JwtService],
    });

    await app.init();

    sut = app.get(AuthService);
  });

  afterAll(() => {
    app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Tests

  it('should be defined', () => {
    // Assert
    expect(app).toBeDefined();
    expect(sut).toBeDefined();
  });

  describe('#validateUser', () => {
    const user = mockUsersList.find((user) => user.email === 'user@email.com');

    it('should return the user object without the password if email and password are valid', async () => {
      // Arrange
      const { password: _, ...expectedUser } = user;
      jest
        .spyOn<any, any>(sut, 'checkPassword')
        .mockImplementationOnce(() => Promise.resolve(true));

      // Act
      const result = await sut.validateUser(user.email, user.password);

      // Assert
      expect(result).toEqual(expectedUser);
    });

    it('should return null if informed password does not match user password', async () => {
      // Arrange
      jest
        .spyOn<any, any>(sut, 'checkPassword')
        .mockImplementationOnce(() => Promise.resolve(false));

      // Act
      const result = await sut.validateUser(user.email, user.password);

      // Assert
      expect(result).toBeNull();
    });

    it('should throw an error if no user is found', async () => {
      // Act/Assert
      expect(async () =>
        sut.validateUser('invalid_email', 'invalid_password'),
      ).rejects.toThrow();
    });
  });

  describe('#login', () => {
    const user = mockUsersList.find((user) => user.email === 'user@email.com');
    it('should return an access token for the informed user', () => {
      // Act
      const result = sut.login(user);

      // Assert
      expect(result).toEqual({ access_token: expect.any(String) });
    });
  });

  describe('#checkPassword', () => {
    it.each`
      password | hash                                                              | expected
      ${'123'} | ${'$2b$04$XJq56kZrU1Tqj5k6rmAp1.bfvb6ER6pSHEMp5tkNmjyZhlmt4kQ5C'} | ${true}
      ${'321'} | ${'$2b$04$XJq56kZrU1Tqj5k6rmAp1.bfvb6ER6pSHEMp5tkNmjyZhlmt4kQ5C'} | ${false}
    `(
      'should return $expected for password $password and hash $hash',
      async ({ password, hash, expected }) => {
        // Act
        const result = await sut['checkPassword'](password, hash);

        // Assert
        expect(result).toEqual(expected);
      },
    );
  });
});
