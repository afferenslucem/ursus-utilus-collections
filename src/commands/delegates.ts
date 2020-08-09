export type FilterCondition<T> = (item: T, index?: number) => boolean;

export type MapCondition<T, E> = (item: T) => E;