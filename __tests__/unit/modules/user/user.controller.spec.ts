// Libs
import { INestApplication } from '@nestjs/common';

// Utils
import { TestUtils } from '../../../test-utils';

// Controllers
import { UserController } from '../../../../src/modules/user/user.controller';

describe('UserController', () => {
  // Configuration
  let app: INestApplication;

  beforeAll(async () => {
    app = await TestUtils.createApp({
      controllers: [UserController],
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
});
