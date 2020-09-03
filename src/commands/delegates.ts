export type FilterCondition<T> = (item: T, index?: number) => boolean;

export type MapCondition<T, E> = (item: T) => E;

export type ServiceMapCondition<T, E> = (item: T, index: number) => E;

export type CompareCondition<T> = (first: T, second: T) => number;

export type ReduceCondition<T> = (first: T, second: T) => T;
export type ReduceWithAccumulatorCondition<T, V> = (acc: V, second: T) => V;