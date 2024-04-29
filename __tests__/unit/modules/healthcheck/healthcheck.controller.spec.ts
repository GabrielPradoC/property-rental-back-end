// Libs
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Controllers
import { HealthcheckController } from '../../../../src/modules/healthcheck/healthcheck.controller';

describe('HealthcheckController', () => {
  // Configuration
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(() => {
    app.close();
  });

  // Tests

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
