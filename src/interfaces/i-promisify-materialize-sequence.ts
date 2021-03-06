import {HashSet} from "../collections/hash-set";
import {IEqualityComparer} from "./i-equality-comparer";
import {MapCondition} from "../delegates";
import {ILookup} from "./i-lookup";
import {Dictionary} from "../collections/distionary";

export interface IPromiseMaterializeSequence<T> {
    // Materializing

    /**
     * Creates an array from sequence
     */
    toArray(): Promise<T[]>;

    toHashSet(): Promise<HashSet<T>>;
    toHashSet(eqalityComparer: IEqualityComparer<T>): Promise<HashSet<T>>

    /**
     * Creates a ILookup<TKey, T[]> from an sequence according to a specified key selector function by using default equality comparer.
     * @param keySelector Function for selecting key
     */
    toLookup<TKey>(keySelector: MapCondition<T, TKey>): Promise<ILookup<TKey, T>>;

    /**
     * Creates a ILookup<TKey, T[]> from an sequence according to a specified key selector function by using specified equality comparer.
     * @param keySelector Function for selecting key
     * @param eqalityComparer Equality comparer for keys equality checking
     */
    toLookup<TKey>(keySelector: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>): Promise<ILookup<TKey, T>>;

    /**
     * Creates a ILookup<TKey, TElement[]> from an sequence according to specified key selector and element selector functions by using default equality comparer.
     * @param keySelector Function for selecting key
     * @param elementSelector Function for selecting keeping element
     */
    toLookup<TKey, TElement>(keySelector: MapCondition<T, TKey>, elementSelector: MapCondition<T, TElement>): Promise<ILookup<TKey, TElement>>;

    /**
     * Creates a ILookup<TKey, TElement[]> from an sequence according to specified key selector and element selector functions by using specified equality comparer.
     * @param keySelector Function for selecting key
     * @param eqalityComparer Equality comparer for keys equality checking
     * @param elementSelector Function for selecting keeping element
     */
    toLookup<TKey, TElement>(keySelector: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>, elementSelector: MapCondition<T, TElement>): Promise<ILookup<TKey, TElement>>;

    /**
     * Creates a Dictionary<TKey, T> from a sequence according to a specified key selector function by using default equality comparer.
     * @param keySelector Function for selecting key
     */
    toDictionary<TKey>(keySelector: MapCondition<T, TKey>): Promise<Dictionary<TKey, T>>;

    /**
     * Creates a Dictionary<TKey, T> from a sequence according to a specified key selector function by using specified equality comparer.
     * @param keySelector Function for selecting key
     * @param eqalityComparer Equality comparer for keys equality checking
     */
    toDictionary<TKey>(keySelector: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>): Promise<Dictionary<TKey, T>>;

    /**
     * Creates a Dictionary<TKey, TElement> from a sequence according to specified key selector and element selector functions by using default equality comparer.
     * @param keySelector Function for selecting key
     * @param elementSelector Function for selecting keeping element
     */
    toDictionary<TKey, TElement>(keySelector: MapCondition<T, TKey>, elementSelector: MapCondition<T, TElement>): Promise<Dictionary<TKey, TElement>>;

    /**
     * Creates a Dictionary<TKey, TElement> from a sequence according to specified key selector and element selector functions by using specified equality comparer.
     * @param keySelector Function for selecting key
     * @param eqalityComparer Equality comparer for keys equality checking
     * @param elementSelector Function for selecting keeping element
     */
    toDictionary<TKey, TElement>(keySelector: MapCondition<T, TKey>, eqalityComparer: IEqualityComparer<TKey>, elementSelector: MapCondition<T, TElement>): Promise<Dictionary<TKey, TElement>>;

}
