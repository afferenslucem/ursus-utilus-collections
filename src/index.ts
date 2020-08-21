import { Collection } from './collections/collection';
import { ICollection } from './interfaces/i-collection';

export * from './interfaces/i-collection';

const exp = function<T>(items: T[]): ICollection<T> {
    return new Collection(items);
};

exp.range = function(from: number, to: number, step = 1): ICollection<number> {
    const result = [];

    for(let i = from; i <= to; i += step) {
        result.push(i);
    }

    return new Collection(result);
}

const RANDOM_MAX = 10e10;

exp.random = function(count: number, max = RANDOM_MAX): ICollection<number> {
    const result = [];

    for(let i = 0; i <= count; i++) {
        const item = Math.floor(Math.random() * RANDOM_MAX) % max;
        result.push(item);
    }

    return new Collection(result);
}

/**
 * Creates ICollection instance
 * @param items Array for converting to collection
 */
export default exp;