import { FilterCondition, MapCondition } from "../commands/delegates";
import { IIterable } from "./i-iterable";

export interface ICollection<T> extends IIterable<T> {
    /**
     * Filtering method
     * @param item Filtering predicate
     */
    where(predicate: FilterCondition<T>) : ICollection<T>;

    /**
     * Skips some data from start of sequence
     * @param shouldSkip Count of skipping elements
     */
    skip(shouldSkip: number) : ICollection<T>;

    /**
     * Takes some data from start of sequence
     * @param shouldTake Count of taking elements
     */
    take(shouldTake: number) : ICollection<T>;

    /**
     * Converts sequence
     * @param condition Converting func
     */
    select<V>(condition: MapCondition<T, V>): ICollection<V>;

    /**
     * Returns first element in sequence or first matching element for secified predicate. If sequence hasn't got matching element throws exception
     * @param predicate Predicate for searching element
     * 
     * @throws 'No matches found'
     */
    first(predicate?: FilterCondition<T>): T;

    /**
     * Returns first element in sequence or first matching element for secified predicate. If sequence hasn't got matching element returns null or default if it's specified
     * @param predicate Predicate for searching element
     * @param $default Default value for returning if sequence hasn't tgot matches
     */
    firstOrDefault(predicate?: FilterCondition<T>, $default?: T | null): T | null;

    /**
     * Returns last element in sequence or last matching element for secified predicate. If sequence hasn't got matching element throws exception
     * @param predicate Predicate for searching element
     * 
     * @throws 'No matches found'
     */
    last(predicate?: FilterCondition<T>): T;

    /**
     * Returns last element in sequence or last matching element for secified predicate. If sequence hasn't got matching element returns null or default if it's specified
     * @param predicate Predicate for searching element
     * @param $default Default value for returning if sequence hasn't tgot matches
     */
    lastOrDefault(predicate?: FilterCondition<T>, $default?: T | null): T | null;

    /**
     * Converting method to array
     * Triggers computation
     * Array is freezed
     */
    toArray(): T[];
}