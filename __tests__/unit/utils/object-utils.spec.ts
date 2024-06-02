// Libs
import { isProxy } from 'util/types';

// Utils
import { ObjectUtils } from '../../../src/utils/object-utils';

describe('ObjectUtils', () => {
  // Configuration
  const targetObject = {
    test: '1',
    name: '2',
    role: '3',
    value: '4',
  };

  // Tests

  describe('#omit', () => {
    it('should remove informed keys from the object', () => {
      // Arrange
      const expected = {
        name: '2',
        role: '3',
      };

      // Act
      const result = ObjectUtils.omit(targetObject, ['test', 'value']);

      // Assert
      expect(result).toEqual(expected);
    });

    it('should not change the original object', () => {
      // Act
      ObjectUtils.omit(targetObject, ['name', 'role']);

      // Assert
      expect(Object.keys(targetObject)).toEqual([
        'test',
        'name',
        'role',
        'value',
      ]);
    });

    it('should return object with all keys if no keys to remove are informed', () => {
      // Act
      const result = ObjectUtils.omit(targetObject, []);

      // Assert
      expect(result).toEqual(targetObject);
    });
  });

  describe('#filter', () => {
    it('should return object containing only the informed keys', () => {
      // Arrange
      const expected = {
        name: '2',
      };

      // Act
      const result = ObjectUtils.filter(targetObject, ['name']);

      // Assert
      expect(result).toEqual(expected);
    });

    it('should return empty object if no keys are informed', () => {
      // Act
      const result = ObjectUtils.filter(targetObject, []);

      // Assert
      expect(result).toEqual({});
    });
  });

  describe('#addProxy', () => {
    it('should add a proxy to the object and return it', () => {
      // Arrange
      const target = {
        name: 'Test name',
      };
      const proxy: ProxyHandler<typeof target> = {
        get(target, prop, receiver) {
          if (prop === 'name') {
            return 'Other name';
          }

          return Reflect.get(target, prop, receiver);
        },
      };

      // Act
      const result = ObjectUtils.addProxy(target, proxy);

      // Result
      expect(isProxy(result)).toBeTruthy();
    });

    it('should correctly call the proxy', () => {
      // Arrange
      const target = {
        name: 'Test name',
      };
      const proxy: ProxyHandler<typeof target> = {
        get(target, prop, receiver) {
          if (prop === 'name') {
            return 'Other name';
          }

          return Reflect.get(target, prop, receiver);
        },
      };
      const proxySpy = jest.spyOn(proxy, 'get');

      // Act
      const result = ObjectUtils.addProxy(target, proxy);

      // Result
      expect(result.name).toEqual('Other name');
      expect(proxySpy).toHaveBeenCalled();
    });

    it('should not alter the target object behaviour', () => {
      // Arrange
      const target = {
        name: 'Test name',
      };
      const proxy: ProxyHandler<typeof target> = {
        get(target, prop, receiver) {
          if (prop === 'name') {
            return 'Other name';
          }

          return Reflect.get(target, prop, receiver);
        },
      };

      // Act
      const result = ObjectUtils.addProxy(target, proxy);

      // Result
      expect(result.name).toEqual('Other name');
      expect(target.name).toEqual('Test name');
    });
  });
});
