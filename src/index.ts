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

exp.random = function(count: number, max = Number.MAX_SAFE_INTEGER): ICollection<number> {
    const result = [];

    for(let i = 0; i <= count; i++) {
        const item = (Math.random() * Number.MAX_SAFE_INTEGER) % max;
        result.push(item);
    }

    return new Collection(result);
}

/**
 * Creates ICollection instance
 * @param items Array for converting to collection
 */
export default exp;