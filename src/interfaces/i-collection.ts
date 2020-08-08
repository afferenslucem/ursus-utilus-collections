import { FilterCondition } from "../commands/delegates";

export interface ICollection<T> {
    /**
     * Filtering method
     * @param item filtering predicate
     */
    where(predicate: FilterCondition<T>) : ICollection<T>;

    /**
     * Converting method to array
     * Triggers computation
     */
    toArray(): T[];
}