// Libs
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Controllers
import { AuthController } from '../../../../src/modules/auth/auth.controller';

// Services
import { AuthService } from '../../../../src/modules/auth/auth.service';

// Enums
import { EnumRoles } from '../../../../src/common/enums';

// Utils
import { TestUtils } from '../../../test-utils';

// Mocks
import { mockUsersList } from '../../../../__mocks__/modules/user/user.service';

jest.mock('../../../../src/modules/auth/auth.service', () => {
  return jest.requireActual('../../../../__mocks__/modules/auth/auth.service');
});

describe('AuthController', () => {
  // Configuration
  let app: INestApplication;

  beforeAll(async () => {
    app = await TestUtils.createApp({
      controllers: [AuthController],
      providers: [AuthService],
    });

    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  // Tests

  it('should be defined', () => {
    // Assert
    expect(app).toBeDefined();
  });

  describe('GET /auth/login', () => {
    const url = '/auth/login';

    it('should authenticate using valid email and password', async () => {
      // Arrange
      const email = 'admin@email.com';
      const password = 'admin_password';

      // Act
      const response = await request(app.getHttpServer())
        .post(url)
        .send({ email, password });

      // Assert
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        access_token: 'admin_token',
      });
    });

    test.each`
      field         | email                | password
      ${'email'}    | ${'user@email.com'}  | ${'admin_password'}
      ${'password'} | ${'admin@email.com'} | ${'user_password'}
    `(
      'should return status 401 if $field does not match an existing user',
      async ({ email, password }) => {
        // Act
        const response = await request(app.getHttpServer())
          .post(url)
          .send({ email, password });

        // Assert
        expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
      },
    );

    it.each`
      field         | value
      ${'email'}    | ${'not_an_email'}
      ${'email'}    | ${undefined}
      ${'email'}    | ${null}
      ${'email'}    | ${[]}
      ${'email'}    | ${{}}
      ${'password'} | ${undefined}
      ${'password'} | ${null}
      ${'password'} | ${[]}
      ${'password'} | ${{}}
    `(
      'should return status 400 if $field is $value',
      async ({ field, value }) => {
        // Arrange
        const loginInfo = {
          email: 'admin@email.com',
          password: 'admin_password',
        };

        loginInfo[field] = value;

        // Act
        const response = await request(app.getHttpServer())
          .post(url)
          .send(loginInfo);

        // Assert
        expect(response.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(response.body).toHaveProperty('error');
      },
    );
  });

  describe('GET /auth/me', () => {
    const url = '/auth/me';
    const user = mockUsersList.find((user) => user.role === EnumRoles.USER);
    const admin = mockUsersList.find((user) => user.role === EnumRoles.ADMIN);

    it.each`
      access_token     | user_object
      ${'admin_token'} | ${{ id: admin.id, name: admin.name, email: admin.email }}
      ${'user_token'}  | ${{ id: user.id, name: user.name, email: user.email }}
    `(
      'should return a valid user for each access_token',
      async ({ access_token, user_object }) => {
        // Act
        const response = await request(app.getHttpServer())
          .get(url)
          .auth(access_token, { type: 'bearer' });

        // Assert
        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body).toEqual(user_object);
      },
    );

    it.each`
      token              | status
      ${'admin_token'}   | ${HttpStatus.OK}
      ${'user_token'}    | ${HttpStatus.OK}
      ${'invalid_token'} | ${HttpStatus.FORBIDDEN}
    `('should return $status for $token', async ({ status, token }) => {
      // Act
      const response = await request(app.getHttpServer())
        .get(url)
        .auth(token, { type: 'bearer' });

      // Assert
      expect(response.status).toEqual(status);
    });
  });
});
