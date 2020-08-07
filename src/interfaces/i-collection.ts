import { FilterCondition } from "../commands/delegates";

export interface ICollection<T> {
    where(item: FilterCondition<T>) : ICollection<T>;
    toArray(): T[];
}