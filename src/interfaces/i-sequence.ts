import { IIterable } from "./i-iterable";
import { ISortingCollection } from "./i-sorting-collection";
import { IGroupedData } from "./i-grouped-data";
import { ReduceCondition, ReduceWithAccumulatorCondition, FilterCondition, MapCondition, EqualityCondition, CompareCondition, GroupJoinCondition, ZipCondition } from "../delegates";
import { Dictionary } from "../collections/distionary";
import { IEqualityComparer } from "./i-equality-comparer";
import { HashSet } from "../collections/hash-set";
import { ILookup } from "./i-lookup";
import {IMaterializeSequence} from "./i-materialize-sequence";
import {IPromiseMaterializeSequence} from "./i-promisify-materialize-sequence";
import {PromisifyCollection} from "../sequence";

export interface ISequence<T> extends IIterable<T>, IMaterializeSequence<T> {

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
     * Determines whether a sequence contains a specified element. Using default equality comparer.
     * @param element Element for checking
     */
    contains(element: T): boolean;
    
    /**
     * Determines whether a sequence contains a specified element. Using specified equality comparer.
     * @param element Element for checking
     * @param comparer Equality comparer
     */
    contains(element: T, comparer: IEqualityComparer<T>): boolean;

    
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
     * Determines whether two sequences are equal by comparing the elements by using the default equality comparer;
     * @param sequence Second sequence for equality checking
     */
    sequenceEqual(sequence: T[] | ISequence<T>): boolean;

    /**
     * Determines whether two sequences are equal by comparing the elements by using specified equality comparer for their type.
     * @param sequence Second sequence for equality checking
     * @param eqalityComparer Equality comparer for items equality checking
     */
    sequenceEqual(sequence: T[] | ISequence<T>, eqalityComparer: IEqualityComparer<T>): boolean;

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
     * Returns distinct elements from a sequence by using default equality comparer
     */
    distinct(): ISequence<T>;

    /**
     * Returns distinct elements from a sequence by using specified equality comparer
     * @param eqalityComparer Equality comparer for items equality checking
     */
    distinct(comparer: IEqualityComparer<T>): ISequence<T>;


    /**
     * Groups items by key by using default equalityComparer.
     * @param keySelector Function for selecting key
     */
    groupBy<TKey>(keySelector: MapCondition<T, TKey>): ISequence<IGroupedData<TKey, ISequence<T>>>;
    
    /**
     * Groups items by key by using specified equalityComparer.
     * @param keySelector Function for selecting key
     * @param eqalityComparer Equality comparer for keys equality checking
     */
    groupBy<TKey>(keySelector: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>): ISequence<IGroupedData<TKey, ISequence<T>>>;

    /**
     * Groups items by key and transforms groups by groupMap function by using default equalityComparer.
     * @param keySelector Function for selecting key
     * @param groupMap Group mapping function
     */
    groupBy<TKey, TValue>(keySelector: MapCondition<T, TKey>, groupMap: MapCondition<ISequence<T>, TValue>): ISequence<IGroupedData<TKey, TValue>>;
    
    /**
     * Groups items by key and transforms groups by groupMap function by using specified equalityComparer.
     * @param keySelector Function for selecting key
     * @param eqalityComparer Equality comparer for keys equality checking
     * @param groupMap Group mapping function
     */
    groupBy<TKey, TValue>(keySelector: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>, groupMap: MapCondition<ISequence<T>, TValue>): ISequence<IGroupedData<TKey, TValue>>;

    
    /**
     * Sorts the elements of a sequence in ascending order to a key.
     * @param keySelector Function for selecting key
     */
    orderBy<TKey>(keySelector: MapCondition<T, TKey>): ISortingCollection<T>;

    /**
     * Sorts the elements of a sequence in ascending order to a key.
     * @param keySelector Function for selecting key
     * @param comparingCondition Function for comparing sorting keys
     */
    orderBy<TKey>(keySelector: MapCondition<T, TKey>, comparingCondition: CompareCondition<TKey>): ISortingCollection<T>;


    /**
     * Sorts the elements of a sequence in descending order to a key.
     * @param keySelector Function for selecting key
     */
    orderByDescending<TKey>(keySelector: MapCondition<T, TKey>): ISortingCollection<T>;

    /**
     * Sorts the elements of a sequence in descending order to a key.
     * @param keySelector Function for selecting key
     * @param comparingCondition Function for comparing sorting keys
     */
    orderByDescending<TKey>(keySelector: MapCondition<T, TKey>, comparingCondition: CompareCondition<TKey>): ISortingCollection<T>;


    /**
     * Adds a value to the beginning of the sequence.
     */
    prepend(item: T): ISequence<T>;

    /**
     * Allow execute computes in promise
     */
    promisify(): PromisifyCollection<T>
    
    /**
     * Inverts the order of the elements in a sequence.
     */
    reverse(): ISequence<T>;
    

    /**
     * Converts each element of a sequence into a new form.
     * @param condition Converting func
     */
    select<TResult>(condition: MapCondition<T, TResult>): ISequence<TResult>;

    /**
     * Projects each element of a sequence to an Array<T> and flattens the resulting sequence into one sequence.
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
     * Sorts items ascending by using default comparison.
     */
    sort(): ISequence<T>;

    /**
     * Sorts items ascending by using specified comparison.
     * @param condition Condition for compare items
     */
    sort(condition: CompareCondition<T>): ISequence<T>;

    /**
     * Sorts items descending by using default comparison.
     */
    sortDescending(): ISequence<T>;

    /**
     * Sorts items descending by using specified comparison.
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
     * @param items Second collection for union
     */
    except(items: T[] | ISequence<T>): ISequence<T>;

    /**
     * Produces the set difference of two collections by using the specified comparer to compare values.
     * @param items Second collection for union
     * @param eqalityComparer Equality comparer for items equality checking
     */
    except(items: T[] | ISequence<T>, eqalityComparer: IEqualityComparer<T>): ISequence<T>;
    

    /**
     * Produces the set sequence of two collections by using the default equality comparer to compare values.
     * @param items Second collection for union
     */
    intersect(items: T[] | ISequence<T>): ISequence<T>;

    /**
     * Produces the set sequence of two collections by using the specified equality comparer to compare values.
     * @param items Second collection for union
     * @param eqalityComparer Equality comparer for items equality checking
     */
    intersect(items: T[] | ISequence<T>, coeqalityComparermparer: IEqualityComparer<T>): ISequence<T>;


    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results by using default comparer.
     * @param iterable Collection for joining
     * @param firstKeySelector Function for selecting key
     * @param secondKeySelector Function for selecting key
     * @param zipFunc Function for merging elements
     */
    groupJoin<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKeySelector: MapCondition<T, TKey>,
        secondKeySelector: MapCondition<T2, TKey>,
        zipFunc: GroupJoinCondition<T, T2, TResult>): ISequence<TResult>
        

    /**
     * Correlates the elements of two sequences based on equality of keys and groups the results by using specified comparer.
     * @param iterable Collection for joining
     * @param firstKeySelector Function for selecting key
     * @param secondKeySelector Function for selecting key
     * @param eqalityComparer Equality comparer for items equality checking
     * @param zipFunc Function for merging elements
     */
    groupJoin<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKeySelector: MapCondition<T, TKey>,
        secondKeySelector: MapCondition<T2, TKey>,
        eqalityComparer: IEqualityComparer<TKey>,
        zipFunc: GroupJoinCondition<T, T2, TResult>): ISequence<TResult>


    /**
     * Correlates the elements of two collections based on matching keys by using default keys equality comparer.
     * @param iterable Collection for joining
     * @param firstKeySelector Function for selecting key
     * @param secondKeySelector Function for selecting key
     * @param zipFunc Function for merging elements
     */
    join<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKeySelector: MapCondition<T, TKey>,
        secondKeySelector: MapCondition<T2, TKey>,
        zipFunc: ZipCondition<T, T2, TResult>): ISequence<TResult>

    /**
     * Correlates the elements of two collections based on matching keys by using specified keys equality comparer.
     * @param iterable Collection for joining
     * @param firstKeySelector Function for selecting key
     * @param secondKeySelector Function for selecting key
     * @param eqalityComparer Equality comparer for keys equality checking
     * @param zipFunc Function for merging elements
     */
    join<T2, TKey, TResult>(
        iterable: ISequence<T2> | T2[],
        firstKeySelector: MapCondition<T, TKey>,
        secondKeySelector: MapCondition<T2, TKey>,
        eqalityComparer: IEqualityComparer<TKey>,
        zipFunc: ZipCondition<T, T2, TResult>): ISequence<TResult>


    /**
     * Produces the set union of two collections by using the default equality comparer.
     * @param items Second collection for union
     */
    union(items: T[] | ISequence<T>): ISequence<T>;

    /**
     * Produces the set union of two collections by using the specified  equality comparer.
     * @param items Second collection for union
     * @param eqalityComparer Equality comparer for items equality checking
     */
    union(items: T[] | ISequence<T>, eqalityComparer: IEqualityComparer<T>): ISequence<T>;


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
}
