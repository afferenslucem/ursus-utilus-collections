export type FilterCondition<T> = (item: T, index?: number) => boolean;

export function filter<T>(items: T[], condition: FilterCondition<T>): T[] {
    return items.filter((item, index) => condition(item, index));
}

export type MapCondition<T, E> = (item: T) => E;

export function map<T, E>(items: T[], condition: MapCondition<T, E>): E[] {
    return items.map((item) => condition(item));
}

export function skip<T>(count: number): T[] {
    return items.map((item) => condition(item));
}