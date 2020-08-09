import { FilterCondition, MapCondition } from "../commands/delegates";

export interface ICollection<T> {
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
     * Converting method to array
     * Triggers computation
     */
    toArray(): T[];
}