// Libs
import {
  INestApplication,
  ModuleMetadata,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

// Mocks
import { MockJwtAuthGuard } from '../__mocks__/modules/auth/guards/mock-jwt-auth.guard';

// Guards
import { JwtAuthGuard } from '../src/modules/auth/guards/jwt-auth.guard';

// Strategies
import { JwtStrategy } from '../src/modules/auth/strategies/jwt.strategy';

// Utils
import { ObjectUtils } from '../src/utils/object-utils';

/**
 * TestUtils
 *
 * Class containing helper methods to use inside tests
 */
export class TestUtils {
  /**
   * createApp
   *
   * Creates and returns an app instance created using the informed metadata including a global JWT guard
   *
   * @param metadata - App metadata
   * @returns App instance
   */
  public static async createApp(
    metadata: ModuleMetadata,
  ): Promise<INestApplication> {
    process.env.JWT_SECRET = 'secret';
    const moduleRef: TestingModule = await Test.createTestingModule({
      ...metadata,
      providers: [
        ...(metadata?.providers ?? []),
        {
          provide: JwtAuthGuard,
          useClass: MockJwtAuthGuard,
        },
        JwtStrategy,
      ],
    }).compile();

    const app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalGuards(app.get(JwtAuthGuard));
    return ObjectUtils.addProxy(app, {
      get(target, prop, receiver) {
        if (prop === 'close') {
          delete process.env.JWT_SECRET;
        }

        return Reflect.get(target, prop, receiver);
      },
    });
  }
}
