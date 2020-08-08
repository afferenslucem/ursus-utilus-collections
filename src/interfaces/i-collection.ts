import { FilterCondition, MapCondition } from "../commands/delegates";

export interface ICollection<T> {
    /**
     * Filtering method
     * @param item Filtering predicate
     */
    where(predicate: FilterCondition<T>) : ICollection<T>;

    /**
     * Converting method to array
     * Triggers computation
     */
    toArray(): T[];

    /**
     * Converts sequence
     * @param condition Converting func
     */
    select<V>(condition: MapCondition<T, V>): ICollection<V>;
}