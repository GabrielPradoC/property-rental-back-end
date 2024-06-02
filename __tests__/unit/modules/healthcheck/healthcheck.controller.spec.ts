// Libs
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Controllers
import { HealthcheckController } from '../../../../src/modules/healthcheck/healthcheck.controller';

// Utils
import { TestUtils } from '../../../test-utils';

describe('HealthcheckController', () => {
  // Configuration
  let app: INestApplication;

  beforeAll(async () => {
    app = await TestUtils.createApp({
      controllers: [HealthcheckController],
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

  describe('GET /healthcheck', () => {
    const url = '/healthcheck';

    it('should return a formatted object containing a date property', async () => {
      // Act
      const response = await request(app.getHttpServer()).get(url);

      // Assert
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        date: expect.any(String),
      });
    });
  });
});
