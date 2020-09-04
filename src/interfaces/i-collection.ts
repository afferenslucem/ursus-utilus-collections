import { FilterCondition, MapCondition, CompareCondition, ReduceCondition, ReduceWithAccumulatorCondition } from "../commands/delegates";
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
     * Skips some data from start of collection
     * @param shouldSkip Count of skipping elements
     */
    skip(shouldSkip: number) : ICollection<T>;

    /**
     * Takes some data from start of collection
     * @param shouldTake Count of taking elements
     */
    take(shouldTake: number) : ICollection<T>;

    /**
     * Converts collection
     * @param condition Converting func
     */
    select<V>(condition: MapCondition<T, V>): ICollection<V>;

    /**
     * Returns first element of collection.
     * @throws 'No matches found' if collection contains no one element
     */
    first(): T;

    /**
     * Returns first element of collection passed the condition.
     * @param condition Condition for searching element
     * @throws 'No matches found' if no one element passed condition
     */
    first(condition: FilterCondition<T>): T;

    /**
     * Returns first element in collection or null
     */
    firstOrDefault(): T | null;

    /**
     * Returns first element in collection or specified $default
     * @param $default Default value for returning if collection hasn't got any element
     */
    firstOrDefault($default: T): T;

    /**
     * Returns first element in collection passed the condition
     * @param condition Condition for search element
     * @param $default Default value. Will returning if filtered collection hasn't got elements
     */
    firstOrDefault($default: T | null, condition: FilterCondition<T>): T | null;

    /**
     * Returns last element of collection.
     * @throws 'No matches found' if collection contains no one element
     */
    last(): T;

    /**
     * Returns last element of collection passed the condition.
     * @param condition Condition for searching element
     * @throws 'No matches found' if no one element passed condition
     */
    last(predicate: FilterCondition<T>): T;

    /**
     * Returns last element in collection or null
     */
    lastOrDefault(): T | null;

    /**
     * Returns last element in collection or specified @param $default
     * @param $default Default value for returning if collection hasn't got any element
     */
    lastOrDefault($default: T): T;

    /**
     * Returns last element in collection passed the @param condition
     * @param condition Condition for search element
     * @param $default Default value. Will returning if filtered collection hasn't got elements
     */
    lastOrDefault($default: T | null, condition: FilterCondition<T>): T | null;


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
     * Returns minimum value in collection. 
     * Will using default comparing like rule.
     */
    min(): T;

    /**
     * Returns minimum value in collection by rule.
     * @param comparing Rule for comparing two values
     */
    min(comparing: CompareCondition<T>): T;

    /**
     * Returns maximum value in collection.
     * Will using default comparing like rule.
     */
    max(): T;

    /**
     * Returns maximum value in collection by rule.
     * @param comparing Rule for comparing two values
     */
    max(comparing: CompareCondition<T>): T;

    /**
     * @deprecated use any instead
     * Check element what can pass condition
     * @param predicate Predicate for element check
     */
    exists(predicate: FilterCondition<T>): boolean;

    /**
     * Determines whether any element of a collection satisfies a condition.
     * @param condition Condition for check
     */
    any(condition: FilterCondition<T>): boolean;

    /**
     * Determines whether any element of a collection satisfies a condition.
     * @param condition Condition for check
     */
    all(condition: FilterCondition<T>): boolean;
    
    /**
     * Determines whether a collection contains a specified element.
     * @param element Element for checking
     */
    contains(element: T): boolean;

    /**
     * Computes the sum of a collection of numeric values.
     */
    sum(): number;

    /**
     * Computes the sum of numeric props on items of a collection
     * @param map function for taking element property
     */
    sum(map: MapCondition<T, number>): number;

    /**
     * Computes the average of a collection of numeric values.
     */
    average(): number;

    /**
     * Computes the average of numeric props on items of a collection
     * @param map function for taking element property
     */
    average(map: MapCondition<T, number>): number;

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
     * Returns the number of elements in a collection.
     */
    count(): number;

    /**
     * Returns the number of elements passed codition.
     * @param condition Predicate for counting elements by condition
     */
    count(condition: FilterCondition<T>): number;

    /**
     * Applies an accumulator function over a collection skipping first value and this value using like accumulator.
     * @param predicate Aggregating rule
     */
    aggregate(predicate: ReduceCondition<T>): T;

    /**
     * Applies an accumulator function over a collection with initialized accumulator value.
     * @param predicate Aggregating rule
     */
    aggregate(predicate: ReduceCondition<T>, accumulator: T): T;

    /**
     * Applies an accumulator function over a collection with initialized accumulator value.
     * @param predicate Aggregating rule
     */
    aggregate<V>(predicate: ReduceWithAccumulatorCondition<T, V>, accumulator: V): V;

    /**
     * Returns zipped collections
     */
    zip<V>(iterable: ICollection<V> | V[]): ICollection<[T, V]>
    
    /**
     * Returns element at specified index at collection.
     * @param position Position of element
     * @throws 'No matches found' if collection doesn't contain element with this index
     */
    elementAt(position: number): T;

    /**
     * Returns element at specified index at collection. If collection hasn't got matching element returns default
     * @param position Position of element
     * @param $default Default value for returning if collection hasn't got matches
     */
    elementAtOrDefault(position: number, $default?: T): T | null | undefined;

    /**
     * Converting method to array
     * Triggers computation
     * Array is freezed
     */
    toArray(): T[];
}