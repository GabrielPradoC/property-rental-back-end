// Libs
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

// Utils
import { TestUtils } from '../../../test-utils';

// Entities
import { User } from '../../../../src/modules/user/user.entity';

// Services
import { UserService } from '../../../../src/modules/user/user.service';

// Mocks
import { mockUsersList } from '../../../../__mocks__/modules/user/user.service';

describe('UserService', () => {
  // Configuration
  let app: INestApplication;
  let sut: UserService;

  const findOneByOrFailSpy: jest.SpyInstance = jest.fn();

  beforeAll(async () => {
    app = await TestUtils.createApp({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory(..._) {
            return {
              findOneByOrFail: findOneByOrFailSpy,
            } as unknown as Repository<User>;
          },
        },
      ],
    });

    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  beforeEach(() => {
    sut = app.get(UserService);
  });

  // Tests

  it('should be defined', () => {
    // Assert
    expect(app).toBeDefined();
    expect(sut).toBeDefined();
  });

  describe('#findByEmail', () => {
    it('should return a user if one is found', async () => {
      // Arrange
      findOneByOrFailSpy.mockResolvedValueOnce(mockUsersList[0]);

      // Act
      const result = await sut.findByEmail('user@email.com');

      // Assert
      expect(result).toEqual(mockUsersList[0]);
    });

    it('should throw if no user is found', async () => {
      // Arrange
      findOneByOrFailSpy.mockRejectedValueOnce(new Error());

      // Assert
      expect(async () => sut.findByEmail('user@email.com')).rejects.toThrow();
    });
  });
});
