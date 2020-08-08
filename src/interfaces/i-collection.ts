import { FilterCondition, MapCondition } from "../commands/delegates";

export interface ICollection<T> {
    /**
     * Filtering method
     * @param item Filtering predicate
     */
    where(predicate: FilterCondition<T>) : ICollection<T>;

    skip(count: number) : ICollection<T>;

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