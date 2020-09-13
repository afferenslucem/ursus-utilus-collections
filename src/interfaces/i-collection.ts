import { IIterable } from "./i-iterable";
import { ISortingCollection } from "./i-sorting-collection";
import { IGroupedData } from "./i-grouped-data";
import { ReduceCondition, ReduceWithAccumulatorCondition, FilterCondition, MapCondition, EqualityCondition, CompareCondition, GroupJoinCondition, ZipCondition } from "../delegates";
import { Dictionary } from "../collections/distionary";
import { IEqualityComparer } from "./i-equality-comparer";
import { HashSet } from "../collections/hash-set";

export interface ISequence<T> extends IIterable<T> {

    // Aggregating

    /**
     * Applies an accumulator function over a sequence skipping first value and this value using like accumulator.
     * @param accumulatorFunc Aggregating rule
     */
    aggregate(accumulatorFunc: ReduceCondition<T>): T;

    /**
     * Applies an accumulator function over a sequence with initialized accumulator value.
     * @param accumulatorFunc Aggregating rule
     */
    aggregate(accumulatorFunc: ReduceCondition<T>, accumulator: T): T;

    /**
     * Applies an accumulator function over a sequence with initialized accumulator value.
     * @param accumulatorFunc Aggregating rule
     */
    aggregate<TResult>(accumulatorFunc: ReduceWithAccumulatorCondition<T, TResult>, accumulator: TResult): TResult;


    /**
     * Determines whether any element of a sequence satisfies a condition.
     * @param condition Condition for check
     */
    all(condition: FilterCondition<T>): boolean;


    /**
     * Determines whether any element of a sequence satisfies a condition.
     * @param condition Condition for check
     */
    any(condition: FilterCondition<T>): boolean;


    /**
     * Computes the average of a sequence of numeric values.
     */
    average(): number;

    /**
     * Computes the average of numeric props on items of a sequence
     * @param map function for taking element property
     */
    average(map: MapCondition<T, number>): number;

    /**
     * Determines whether a sequence contains a specified element. Using default equality condition.
     * @param element Element for checking
     */
    contains(element: T): boolean;
    
    /**
     * Determines whether a sequence contains a specified element. Using custom equality condition.
     * @param element Element for checking
     * @param condition Equality condition
     */
    contains(element: T, condition: EqualityCondition<T>): boolean;

    
    /**
     * Returns the number of elements in a sequence.
     */
    count(): number;

    /**
     * Returns the number of elements passed codition.
     * @param condition Predicate for counting elements by condition
     */
    count(condition: FilterCondition<T>): number;

    /**
     * Returns count of elements from a sequence as long as a specified condition is true.
     * @param condition Predicate for counting elements by condition
     */
    countWhile(condition: FilterCondition<T>): number;
    
    
    /**
     * Returns element at specified index at sequence.
     * @param position Position of element
     * @throws 'No matches found' if sequence doesn't contain element with this index
     */
    elementAt(position: number): T;

    /**
     * Returns element at specified index at sequence. If sequence hasn't got matching element returns null
     * @param position Position of element
     */
    elementAtOrDefault(position: number): T | null;
    
    /**
     * Returns element at specified index at sequence. If sequence hasn't got matching element returns specified default
     * @param position Position of element
     * @param $default Default value for returning if sequence hasn't got matches
     */
    elementAtOrDefault(position: number, $default: T): T

    
    /**
     * Returns first element of sequence.
     * @throws 'No matches found' if sequence contains no one element
     */
    first(): T;

    /**
     * Returns first element of sequence passed the condition.
     * @param condition Condition for searching element
     * @throws 'No matches found' if no one element passed condition
     */
    first(condition: FilterCondition<T>): T;


    /**
     * Returns first element in sequence or null
     */
    firstOrDefault(): T | null;

    /**
     * Returns first element in sequence or specified $default
     * @param $default Default value for returning if sequence hasn't got any element
     */
    firstOrDefault($default: T): T;

    /**
     * Returns first element in sequence passed the condition
     * @param condition Condition for search element
     * @param $default Default value. Will returning if filtered sequence hasn't got elements
     */
    firstOrDefault($default: T | null, condition: FilterCondition<T>): T | null;


    /**
     * Returns last element of sequence.
     * @throws 'No matches found' if sequence contains no one element
     */
    last(): T;

    /**
     * Returns last element of sequence passed the condition.
     * @param condition Condition for searching element
     * @throws 'No matches found' if no one element passed condition
     */
    last(predicate: FilterCondition<T>): T;


    /**
     * Returns last element in sequence or null
     */
    lastOrDefault(): T | null;

    /**
     * Returns last element in sequence or specified $default
     * @param $default Default value for returning if sequence hasn't got any element
     */
    lastOrDefault($default: T): T;

    /**
     * Returns last element in sequence passed the condition
     * @param condition Condition for search element
     * @param $default Default value. Will returning if filtered sequence hasn't got elements
     */
    lastOrDefault($default: T | null, condition: FilterCondition<T>): T | null;


    /**
     * Returns maximum value in sequence.
     * Will using default comparing like rule.
     */
    max(): T;

    /**
     * Returns maximum value in sequence by compare rule.
     * @param comparing Rule for comparing two values
     */
    max(comparing: CompareCondition<T>): T;


    /**
     * Returns minimum value in sequence. 
     * Will using default comparing like rule.
     */
    min(): T;

    /**
     * Returns minimum value in sequence by compare rule.
     * @param comparing Rule for comparing two values
     */
    min(comparing: CompareCondition<T>): T;
    
    /**
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer.
     */
    sequenceEqual(sequence: T[] | ISequence<T>): boolean;

    /**
     * Determines whether two sequences are equal by comparing the elements by using the specified equality comparer.
     */
    sequenceEqual(sequence: T[] | ISequence<T>, comparer: (first: T, second: T) => boolean): boolean;

    /**
     * Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
     * @throws 'Elements count greater then 1.' If sequence has more then one element.
     * @throws 'No matches found.' If sequence is empty.
     */
    single(): T;


    /**
     * Returns the only element of a sequence, or a null if the sequence is empty; this method throws an exception if there is more than one element in the sequence.
     * @throws 'Elements count greater then 1.' If sequence has more then one element.
     */
    singleOrDefault(): T | null;

    /**
     * Returns the only element of a sequence, or a specified default if the sequence is empty; this method throws an exception if there is more than one element in the sequence.
     * @throws 'Elements count greater then 1.' If sequence has more then one element.
     */
    singleOrDefault($default: T): T;


    /**
     * Computes the sum of a sequence of numeric values.
     */
    sum(): number;

    /**
     * Computes the sum of numeric props on items of a sequence
     * @param map function for taking element property
     */
    sum(map: MapCondition<T, number>): number;


    // Querring


    /**
     * Appends a value to the end of the sequence.
     */
    append(item: T): ISequence<T>;

    /**
     * Returns the elements of the sequence or the specified value in a sequence if the original sequence is empty.
     */
    defaultIfEmpty(value: T | T[] | ISequence<T>): ISequence<T>;

    /**
     * Returns distinct elements from a sequence using default equality comparer
     */
    distinct(): ISequence<T>;

    /**
     * Returns distinct elements from a sequence using specified equality comparer
     * @param comparer Rule for comparing
     */
    distinct(comparer: IEqualityComparer<T>): ISequence<T>;


    /**
     * Groups items by key
     * @param key Key taking function
     */
    groupBy<TKey>(key: MapCondition<T, TKey>): ISequence<IGroupedData<TKey, ISequence<T>>>;

    /**
     * Groups items by key and modify theese by mapCondition
     * @param key Key taking function
     * @param groupMap Group mapping function
     */
    groupBy<TKey, TValue>(key: MapCondition<T, TKey>, groupMap: MapCondition<ISequence<T>, TValue>): ISequence<IGroupedData<TKey, TValue>>;

    
    /**
     * Sorts the elements of a sequence in ascending order to a key
     * @param key Key taking function
     */
    orderBy<TKey>(key: MapCondition<T, TKey>): ISortingCollection<T>;

    /**
     * Sorts the elements of a sequence in ascending order to a key
     * @param key Key taking function
     * @param condition Comparing function
     */
    orderBy<TKey>(key: MapCondition<T, TKey>, condition: CompareCondition<TKey>): ISortingCollection<T>;


    /**
     * Sorts the elements of a sequence in descending order to a key
     * @param key Key taking function
     */
    orderByDescending<TKey>(key: MapCondition<T, TKey>): ISortingCollection<T>;

    /**
     * Sorts the elements of a sequence in descending order to a key
     * @param key Key taking function
     * @param condition Comparing function
     */
    orderByDescending<TKey>(key: MapCondition<T, TKey>, condition: CompareCondition<TKey>): ISortingCollection<T>;


    /**
     * Adds a value to the beginning of the sequence.
     */
    prepend(item: T): ISequence<T>;

    
    /**
     * Inverts the order of the elements in a sequence
     */
    reverse(): ISequence<T>;
    

    /**
     * Converts each element of a sequence into a new form.
     * @param condition Converting func
     */
    select<TResult>(condition: MapCondition<T, TResult>): ISequence<TResult>;

    /**
     * Projects each element of a sequence to an Array<T> and flattens the resulting sequence into one sequence
     */
    selectMany<TResult>(condition: MapCondition<T, TResult[]>): ISequence<TResult>;


    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     * @param shouldSkip Count of skipping elements
     */
    skip(shouldSkip: number) : ISequence<T>;


    /**
     * Returns a new sequence that contains the elements from source with the last specified count elements of the source sequence omitted.
     * @param shouldSkip Count of skipping elements
     */
    skipLast(shouldSkip: number) : ISequence<T>;


    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
     * @param shouldSkipCondition Condition for skipping elements
     */
    skipWhile(shouldSkipCondition: FilterCondition<T>) : ISequence<T>;


    /**
     * Sorts items ascending using default comparison
     */
    sort(): ISequence<T>;

    /**
     * Sorts items ascending using specified comparison
     * @param condition Comparing condition
     */
    sort(condition: CompareCondition<T>): ISequence<T>;

    /**
     * Sorts items descending using default comparison
     */
    sortDescending(): ISequence<T>;

    /**
     * Sorts items descending using default comparison
     * @param condition Comparing condition
     */
    sortDescending(condition: CompareCondition<T>): ISequence<T>;


    /**
     * Returns a specified number of elements from the start of a sequence.
     * @param shouldTake Count of taking elements
     */
    take(shouldTake: number) : ISequence<T>;

    /**
     * Returns a new sequence that contains the last specified count elements from source.
     * @param shouldTake Count of taking elements
     */
    takeLast(shouldTake: number) : ISequence<T>;

    /**
     * Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
     * @param shouldTakeCondition Condition for returning elements
     */
    takeWhile(shouldTakeCondition: FilterCondition<T>) : ISequence<T>;

    
    /**
     * Filters a sequence by predicate.
     * @param predicate Filtering predicate
     */
    where(predicate: FilterCondition<T>) : ISequence<T>;

    // Joining

    /**
     * Concatenates two collections.
     */
    concat(items: T[] | ISequence<T>): ISequence<T>;
    

    /**
     * Produces the set difference of two collections by using the default equality comparer to compare values.
     */
    except(items: T[] | ISequence<T>): ISequence<T>;

    /**
     * Produces the set difference of two collections by using the specified comparer to compare values.
     * @param comparer function to compare values
     */
    except(items: T[] | ISequence<T>, comparer: IEqualityComparer<T>): ISequence<T>;
    

    /**
     * Produces the set sequence of two collections by using the default equality comparer to compare values.
     */
    intersect(items: T[] | ISequence<T>): ISequence<T>;

    /**
     * Produces the set sequence of two collections by using the specified equality comparer to compare values.
     * @param comparer function to compare values
     */
    intersect(items: T[] | ISequence<T>, comparer: IEqualityComparer<T>): ISequence<T>;


    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results.
     * @param iterable Collection for joining
     * @param firstKey Key taking function
     * @param secondKey Key taking function
     * @param zipFunc Function for merging elements
     */
    groupJoin<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        zipFunc: GroupJoinCondition<T, T2, TResult>): ISequence<TResult>


    /**
     * Correlates the elements of two collections based on matching keys.
     * @param iterable Collection for joining
     * @param firstKey Key taking function
     * @param secondKey Key taking function
     * @param zipFunc Function for merging elements
     */
    join<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKey: MapCondition<T, TKey>,
        secondKey: MapCondition<T2, TKey>,
        zipFunc: ZipCondition<T, T2, TResult>): ISequence<TResult>


    /**
     * Produces the set union of two collections by using the default equality comparer.
     */
    union(items: T[] | ISequence<T>): ISequence<T>;

    /**
     * Produces the set union of two collections by using the specified  equality comparer.
     */
    union(items: T[] | ISequence<T>, comparer: IEqualityComparer<T>): ISequence<T>;


    /**
     * Returns new sequence with converted corresponding elements to tuples
     */
    zip<T2>(iterable: ISequence<T2> | T2[]): ISequence<[T, T2]>
    
    /**
     * Applies a specified function to the corresponding elements of two collections, producing a sequence of the results
     * @param iterable Collection for merging
     * @param zipFunc Function for merging elements
     */
    zip<T2, TResult>(iterable: ISequence<T2> | T2[], zipFunc: ZipCondition<T, T2, TResult>): ISequence<TResult>

    // Materializing

    /**
     * Creates an array from sequence
     */
    toArray(): T[];

    toHashSet(): HashSet<T>;
    toHashSet(eqalityComparer: IEqualityComparer<T>): HashSet<T>

    /**
     * Creates a Dictionary<TKey, T[]> from an sequence according to a specified key selector function.
     * @param key key selector
     */
    toLookup<TKey>(key: MapCondition<T, TKey>): Dictionary<TKey, T[]>;

    /**
     * Creates a Dictionary<TKey, TElement[]> from an sequence according to specified key selector and element selector functions.
     * @param key 
     * @param element 
     */
    toLookup<TKey, TElement>(key: MapCondition<T, TKey>, element: MapCondition<T, TElement>): Dictionary<TKey, TElement[]>;

    /**
     * Creates a Dictionary<TKey, T> from a sequence according to a specified key selector function using by default equality comparer.
     * @param key key selector
     */
    toDictionary<TKey>(key: MapCondition<T, TKey>): Dictionary<TKey, T>;

    /**
     * Creates a Dictionary<TKey, T> from a sequence according to a specified key selector function using by specified equality comparer.
     * @param key key selector
     */
    toDictionary<TKey>(key: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>): Dictionary<TKey, T>;

    /**
     * Creates a Dictionary<TKey, TElement> from a sequence according to specified key selector and element selector functions using by default equality comparer.
     * @param key 
     * @param element 
     */
    toDictionary<TKey, TElement>(key: MapCondition<T, TKey>, element: MapCondition<T, TElement>): Dictionary<TKey, TElement>;
    
    /**
     * Creates a Dictionary<TKey, TElement> from a sequence according to specified key selector and element selector functions using by specified equality comparer.
     * @param key 
     * @param element 
     */
    toDictionary<TKey, TElement>(key: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>, element: MapCondition<T, TElement>): Dictionary<TKey, TElement>;
}