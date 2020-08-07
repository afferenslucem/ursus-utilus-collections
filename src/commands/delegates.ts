import { ICollection } from "../interfaces/i-collection";

export type FilterCondition<T> = (item: T, index?: number) => boolean;

export function filter<T>(items: T[], condition: FilterCondition<T>): T[] {
    return items.filter((item, index) => condition(item, index));
}