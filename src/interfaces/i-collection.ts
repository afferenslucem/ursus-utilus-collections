import { FilterCondition, MapCondition, CompareCondition, ReduceCondition } from "../commands/delegates";
import { IIterable } from "./i-iterable";
import { ISortingCollection } from "./i-sorting-collection";
import { IGroupedData } from "./i-grouped-data";

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
    firstOrDefault($default?: T | null, predicate?: FilterCondition<T>): T | null;

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
    lastOrDefault($default?: T | null, predicate?: FilterCondition<T>): T | null;

    /**
     * Sorts items
     * @param condition Comparing function
     */
    sort(condition?: CompareCondition<T> | undefined): ICollection<T>;

    /**
     * Sorts items descendings
     * @param condition Comparing function
     */
    sortDescending(condition?: CompareCondition<T> | undefined): ICollection<T>;

    /**
     * Sorts items
     * @param map Property taking function
     * @param condition Comparing function
     * @deprecated Use orderBy instead
     */
    sortBy<E>(map: MapCondition<T, E>, condition?: CompareCondition<E> | undefined): ISortingCollection<T>;

    /**
     * Sorts items
     * @param map Property taking function
     * @param condition Comparing function
     */
    orderBy<E>(map: MapCondition<T, E>, condition?: CompareCondition<E> | undefined): ISortingCollection<T>;

    /**
     * Sorts items descending
     * @param map Property taking function
     * @param condition Comparing function
     */
    orderByDescending<E>(map: MapCondition<T, E>, condition?: CompareCondition<E> | undefined): ISortingCollection<T>;

    /**
     * Groups items
     * @param key Key taking function
     * @param group Group taking function
     */
    groupBy<K, E>(key: MapCondition<T, K>, group?: MapCondition<ICollection<T>, E> | undefined): ICollection<IGroupedData<K, E>>;

    /**
     * Finds min value
     * @param predicate Predicate for values comparing
     */
    min(predicate?: CompareCondition<T> | undefined): T;

    /**
     * Finds max value
     * @param predicate Predicate for values comparing
     */
    max(predicate?: CompareCondition<T> | undefined): T;

    /**
     * @deprecated use any instead
     * Check element what can pass condition
     * @param predicate Predicate for element check
     */
    exists(predicate: FilterCondition<T>): boolean;

    /**
     * Check element what can pass condition
     * @param predicate Predicate for element check
     */
    any(predicate: FilterCondition<T>): boolean;

    /**
     * Check that all elements can pass condition
     * @param predicate Predicate for element check
     */
    all(predicate: FilterCondition<T>): boolean;
    
    /**
     * Check element existing at collection
     */
    contains(element: T): boolean;

    /**
     * Sums element of collection
     * @param predicate Sum field taking predicate
     */
    sum<V>(map?: MapCondition<T, V>): V;

    /**
     * Returns reversed collection
     */
    reverse(): ICollection<T>;

    /**
     * Returns collection with unique elements
     * @param mapping Condition for distinct by field
     */
    distinct<K>(mapping?: MapCondition<T, K>): ICollection<T>;

    /**
     * Returns new collection with new elements at end
     */
    concat(items: T[] | ICollection<T>): ICollection<T>;

    /**
     * Returns counts of elements
     * @param predicate Predicate for counting elements by condition
     */
    count(predicate?: FilterCondition<T>): number;

    /**
     * Returns aggregated value
     * @param predicate Predicate for aggregating
     */
    aggregate<V = T>(predicate: ReduceCondition<T, V>, accumulator?: V): V;

    /**
     * Returns zipped collections
     */
    zip<V>(iterable: ICollection<V> | V[]): ICollection<[T, V]>

    /**
     * Converting method to array
     * Triggers computation
     * Array is freezed
     */
    toArray(): T[];
}