import { ISequence } from './interfaces/i-collection';
import { range, random, of, empty, repeat } from './utils/operators';
import { Sequence } from './collection';

const exp = function<T>(items: T[]): ISequence<T> {
    return new Sequence<T>(items);
};

/**
 * Generates a collection of integral numbers within a specified range.
 * @param from Start value
 * @param to End value
 * @param step Generation step
 */
exp.range = range;

/**
 * Generates random collection of specified length
 * @param length Collection lenght
 * @param max Max value for generation
 */
exp.random = random;

/**
 * Generates collection
 * @param obj Collection count
 */
exp.of = of;

/**
 * Creates empty collection
 */
exp.empty = empty;

/**
 * Generates a collection that contains one repeated value.
 * @param value value for generation
 * @param length Collection lenght
 */
exp.repeat = repeat;

/**
 * Creates ICollection instance
 * @param items Array for converting to collection
 */
export default exp;