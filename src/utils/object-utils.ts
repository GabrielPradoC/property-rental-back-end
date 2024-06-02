// Types
import { TObject } from 'src/common/types';

/**
 * ObjectUtils
 *
 * Class containing helper functions to manipulate objects
 */
export class ObjectUtils {
  /**
   * omit
   *
   * Returns a copy of the informed object without the informed keys
   *
   * @param object - Desired object
   * @param keys - Keys to remove
   * @returns Copy of the object without the keys
   */
  public static omit<T extends TObject, Y extends keyof T>(
    object: T,
    keys: Y[],
  ): Exclude<T, Y> {
    const objCopy = {};
    Object.keys(object).forEach((key) => {
      if (keys.includes(key as Y)) return;
      objCopy[key] = object[key];
    });

    return objCopy as Exclude<T, Y>;
  }

  /**
   * filter
   *
   * Returns an object containing only the informed keys from the original object
   *
   * @param object - Object to filter the properties
   * @param keys - Keys to keep
   * @returns Filtered object
   */
  public static filter<T extends TObject, Y extends keyof T>(
    object: T,
    keys: Y[],
  ): Pick<T, Y> {
    const keysToFilter = Object.keys(object).filter(
      (key) => !keys.includes(key as Y),
    );

    return ObjectUtils.omit(object, keysToFilter);
  }

  /**
   * addProxy
   *
   * Adds a proxy to the informed object and returns it
   *
   * @param objectToProxy - Object to add proxy
   * @param proxyHandler - Proxy handler config
   * @returns Proxied object
   */
  public static addProxy<T extends object>(
    objectToProxy: T,
    proxyHandler: ProxyHandler<T>,
  ): T {
    return new Proxy(objectToProxy, proxyHandler);
  }
}
