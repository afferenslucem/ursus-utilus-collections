import { FilterCondition, MapCondition, CompareCondition, ReduceCondition, ReduceWithAccumulatorCondition, ZipCondition, EqualityCondition } from "../commands/delegates";
import { IIterable } from "./i-iterable";
import { ISortingCollection } from "./i-sorting-collection";
import { IGroupedData } from "./i-grouped-data";

export interface ICollection<T> extends IIterable<T> {

    // Aggregating

    /**
     * Applies an accumulator function over a collection skipping first value and this value using like accumulator.
     * @param accumulatorFunc Aggregating rule
     */
    aggregate(accumulatorFunc: ReduceCondition<T>): T;

    /**
     * Applies an accumulator function over a collection with initialized accumulator value.
     * @param accumulatorFunc Aggregating rule
     */
    aggregate(accumulatorFunc: ReduceCondition<T>, accumulator: T): T;

    /**
     * Applies an accumulator function over a collection with initialized accumulator value.
     * @param accumulatorFunc Aggregating rule
     */
    aggregate<TResult>(accumulatorFunc: ReduceWithAccumulatorCondition<T, TResult>, accumulator: TResult): TResult;


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
     * Returns count of elements from a collection as long as a specified condition is true.
     * @param condition Predicate for counting elements by condition
     */
    countWhile(condition: FilterCondition<T>): number;
    
    /**
     * Determines whether a collection contains a specified element. Using default equality condition.
     * @param element Element for checking
     */
    contains(element: T): boolean;
    
    /**
     * Determines whether a collection contains a specified element. Using custom equality condition.
     * @param element Element for checking
     * @param condition Equality condition
     */
    contains(element: T, condition: EqualityCondition<T>): boolean;
    
    
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
     * Returns element at specified index at collection. If collection hasn't got matching element returns specified default
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
     * Returns last element in collection or specified $default
     * @param $default Default value for returning if collection hasn't got any element
     */
    lastOrDefault($default: T): T;

    /**
     * Returns last element in collection passed the condition
     * @param condition Condition for search element
     * @param $default Default value. Will returning if filtered collection hasn't got elements
     */
    lastOrDefault($default: T | null, condition: FilterCondition<T>): T | null;


    /**
     * Returns maximum value in collection.
     * Will using default comparing like rule.
     */
    max(): T;

    /**
     * Returns maximum value in collection by compare rule.
     * @param comparing Rule for comparing two values
     */
    max(comparing: CompareCondition<T>): T;


    /**
     * Returns minimum value in collection. 
     * Will using default comparing like rule.
     */
    min(): T;

    /**
     * Returns minimum value in collection by compare rule.
     * @param comparing Rule for comparing two values
     */
    min(comparing: CompareCondition<T>): T;


    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     * @throws 'Elements count greater then 1.'
     */
    single(): T;


    /**
     * Computes the sum of a collection of numeric values.
     */
    sum(): number;

    /**
     * Computes the sum of numeric props on items of a collection
     * @param map function for taking element property
     */
    sum(map: MapCondition<T, number>): number;


    // Querring


    /**
     * Appends a value to the end of the sequence.
     */
    append(item: T): ICollection<T>;

    /**
     * Returns the elements of the collection or the specified value in a collection if the original collection is empty.
     */
    defaultIfEmpty(value: T | T[] | ICollection<T>): ICollection<T>;

    /**
     * Returns distinct elements from a collection using default equality comparer
     */
    distinct(): ICollection<T>;

    /**
     * Returns distinct elements from a collection using specified equality comparer
     * @param comparer Rule for comparing
     */
    distinct(comparer: EqualityCondition<T>): ICollection<T>;


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
     * Adds a value to the beginning of the sequence.
     */
    prepend(item: T): ICollection<T>;

    
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
     * Projects each element of a collection to an Array<T> and flattens the resulting collection into one collection
     */
    selectMany<TResult>(condition: MapCondition<T, TResult[]>): ICollection<TResult>;


    /**
     * Bypasses a specified number of elements in a collection and then returns the remaining elements.
     * @param shouldSkip Count of skipping elements
     */
    skip(shouldSkip: number) : ICollection<T>;


    /**
     * Returns a new collection that contains the elements from source with the last specified count elements of the source collection omitted.
     * @param shouldSkip Count of skipping elements
     */
    skipLast(shouldSkip: number) : ICollection<T>;


    /**
     * Bypasses elements in a collection as long as a specified condition is true and then returns the remaining elements.
     * @param shouldSkipCondition Condition for skipping elements
     */
    skipWhile(shouldSkipCondition: FilterCondition<T>) : ICollection<T>;


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
     * Returns a new collection that contains the last specified count elements from source.
     * @param shouldTake Count of taking elements
     */
    takeLast(shouldTake: number) : ICollection<T>;

    /**
     * Returns elements from a collection as long as a specified condition is true, and then skips the remaining elements.
     * @param shouldTakeCondition Condition for returning elements
     */
    takeWhile(shouldTakeCondition: FilterCondition<T>) : ICollection<T>;

    
    /**
     * Filters a collection by predicate.
     * @param predicate Filtering predicate
     */
    where(predicate: FilterCondition<T>) : ICollection<T>;

    // Joining

    /**
     * Concatenates two sequences.
     */
    concat(items: T[] | ICollection<T>): ICollection<T>;


    /**
     * Produces the set union of two collections by using the default equality comparer.
     */
    union(items: T[] | ICollection<T>): ICollection<T>;

    /**
     * Produces the set union of two collections by using the specified  equality comparer.
     */
    union(items: T[] | ICollection<T>, comparer: EqualityCondition<T>): ICollection<T>;


    /**
     * Returns new collection with converted corresponding elements to tuples
     */
    zip<T2>(iterable: ICollection<T2> | T2[]): ICollection<[T, T2]>
    
    /**
     * Applies a specified function to the corresponding elements of two collections, producing a collection of the results
     * @param iterable Collection for merging
     * @param zipFunc Function for merging elements
     */
    zip<T2, TResult>(iterable: ICollection<T2> | T2[], zipFunc: ZipCondition<T, T2, TResult>): ICollection<TResult>
    
    /**
     * Correlates the elements of two collections based on matching keys.
     * @param iterable Collection for joining
     * @param firstKey Key taking function
     * @param secondKey Key taking function
     * @param zipFunc Function for merging elements
     */
    join<T2, TKey, TResult>(
        iterable: ICollection<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        zipFunc: ZipCondition<T, T2, TResult>): ICollection<TResult>

    // Materializing

    /**
     * Creates an array from collection
     */
    toArray(): T[];
}