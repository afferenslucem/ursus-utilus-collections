import { NativeArrayWrapper } from './collections/collection';
import { ICollection } from './interfaces/i-collection';

export * from './interfaces/i-collection';

/**
 * Creates ICollection instance
 * @param items Array for converting to collection
 */
export default function<T>(items: T[]): ICollection<T> {
    return new NativeArrayWrapper<T>(items);
}