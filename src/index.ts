import { Collection } from './collections/collection';
import { ICollection } from './interfaces/i-collection';
import { range, random, of, empty, repeat } from './utils/operators';

export * from './interfaces/i-collection';

const exp = function<T>(items: T[]): ICollection<T> {
    return new Collection(items);
};

exp.range = range;

exp.random = random;

exp.of = of;

exp.empty = empty;

exp.repeat = repeat;

/**
 * Creates ICollection instance
 * @param items Array for converting to collection
 */
export default exp;