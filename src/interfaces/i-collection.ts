import { FilterCondition, MapCondition, CompareCondition, ReduceCondition, ReduceWithAccumulatorCondition, ZipCondition } from "../commands/delegates";
import { IIterable } from "./i-iterable";
import { ISortingCollection } from "./i-sorting-collection";
import { IGroupedData } from "./i-grouped-data";

export interface ICollection<T> extends IIterable<T> {

    // Aggregates

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
     * Determines whether any element of a collection satisfies a condition.
     * @param condition Condition for check
     */
    all(condition: FilterCondition<T>): boolean;


    /**
     * Determines whether any element of a collection satisfies a condition.
     * @param condition Condition for check
     */
    any(condition: FilterCondition<T>): boolean;


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
     * Returns the number of elements in a collection.
     */
    count(): number;

    /**
     * Returns the number of elements passed codition.
     * @param condition Predicate for counting elements by condition
     */
    count(condition: FilterCondition<T>): number;
    
    /**
     * Determines whether a collection contains a specified element.
     * @param element Element for checking
     */
    contains(element: T): boolean;
    
    
    /**
     * Returns element at specified index at collection.
     * @param position Position of element
     * @throws 'No matches found' if collection doesn't contain element with this index
     */
    elementAt(position: number): T;

    /**
     * Returns element at specified index at collection. If collection hasn't got matching element returns null
     * @param position Position of element
     */
    elementAtOrDefault(position: number): T | null;
    
    /**
     * Returns element at specified index at collection. If collection hasn't got matching element returns default
     * @param position Position of element
     * @param $default Default value for returning if collection hasn't got matches
     */
    elementAtOrDefault(position: number, $default: T): T

    
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
     * Computes the sum of a collection of numeric values.
     */
    sum(): number;

    /**
     * Computes the sum of numeric props on items of a collection
     * @param map function for taking element property
     */
    sum(map: MapCondition<T, number>): number;


    // Queries

    /**
     * Returns distinct elements from a collection
     */
    distinct(): ICollection<T>;

    /**
     * Returns distinct elements by field from a collection
     * @param mapping Rule for taking field
     */
    distinct<TKey>(mapping: MapCondition<T, TKey>): ICollection<T>;


    /**
     * Groups items by key
     * @param key Key taking function
     */
    groupBy<TKey>(key: MapCondition<T, TKey>): ICollection<IGroupedData<TKey, ICollection<T>>>;

    /**
     * Groups items by key and modify theese by mapCondition
     * @param key Key taking function
     * @param groupMap Group mapping function
     */
    groupBy<TKey, TValue>(key: MapCondition<T, TKey>, groupMap: MapCondition<ICollection<T>, TValue>): ICollection<IGroupedData<TKey, TValue>>;

    
    /**
     * Sorts the elements of a collection in ascending order to a key
     * @param key Key taking function
     */
    orderBy<TKey>(key: MapCondition<T, TKey>): ISortingCollection<T>;

    /**
     * Sorts the elements of a collection in ascending order to a key
     * @param key Key taking function
     * @param condition Comparing function
     */
    orderBy<TKey>(key: MapCondition<T, TKey>, condition: CompareCondition<TKey>): ISortingCollection<T>;


    /**
     * Sorts the elements of a collection in descending order to a key
     * @param key Key taking function
     */
    orderByDescending<TKey>(key: MapCondition<T, TKey>): ISortingCollection<T>;

    /**
     * Sorts the elements of a collection in descending order to a key
     * @param key Key taking function
     * @param condition Comparing function
     */
    orderByDescending<TKey>(key: MapCondition<T, TKey>, condition: CompareCondition<TKey>): ISortingCollection<T>;

    
    /**
     * Inverts the order of the elements in a collection
     */
    reverse(): ICollection<T>;
    

    /**
     * Converts each element of a collection into a new form.
     * @param condition Converting func
     */
    select<TResult>(condition: MapCondition<T, TResult>): ICollection<TResult>;


    /**
     * Bypasses a specified number of elements in a collection and then returns the remaining elements.
     * @param shouldSkip Count of skipping elements
     */
    skip(shouldSkip: number) : ICollection<T>;


    /**
     * Sorts items ascending using default comparison
     */
    sort(): ICollection<T>;

    /**
     * Sorts items ascending using specified comparison
     * @param condition Comparing condition
     */
    sort(condition: CompareCondition<T>): ICollection<T>;

    /**
     * Sorts items descending using default comparison
     */
    sortDescending(): ICollection<T>;

    /**
     * Sorts items descending using default comparison
     * @param condition Comparing condition
     */
    sortDescending(condition: CompareCondition<T>): ICollection<T>;


    /**
     * Returns a specified number of elements from the start of a collection.
     * @param shouldTake Count of taking elements
     */
    take(shouldTake: number) : ICollection<T>;

    
    /**
     * Filters a collection by predicate.
     * @param predicate Filtering predicate
     */
    where(predicate: FilterCondition<T>) : ICollection<T>;

    // Joines

    /**
     * Returns new collection with new elements at end
     */
    concat(items: T[] | ICollection<T>): ICollection<T>;


    /**
     * Returns new collection with converted corresponding elements to tuples
     */
    zip<T2>(iterable: ICollection<T2> | T2[]): ICollection<[T, T2]>
    
    /**
     * Returns new collection with converted corresponding elements to tuples
     */
    zip<T2, TResult>(iterable: ICollection<T2> | T2[], zipFunc: ZipCondition<T, T2, TResult>): ICollection<TResult>

    // Materializing

    /**
     * Converting method to array
     * Triggers computation
     * Array is freezed
     */
    toArray(): T[];
}