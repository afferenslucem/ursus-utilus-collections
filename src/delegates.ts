import { ICollection } from "./interfaces/i-collection";

export type FilterCondition<T> = (item: T, index?: number) => boolean;

export type MapCondition<T, T2> = (item: T) => T2;

export type ServiceMapCondition<T, V> = (item: T, index: number) => V;

export type CompareCondition<T> = (first: T, second: T) => number;

export type EqualityCondition<T> = (first: T, second: T) => boolean;

export type ReduceCondition<T> = (first: T, second: T) => T;
export type ReduceWithAccumulatorCondition<T, V> = (acc: V, second: T) => V;

export type ZipCondition<T1, T2, TResult> = (first: T1, second: T2) => TResult;

export type GroupJoinCondition<T1, T2, TResult> = (first: T1, seconds: ICollection<T2>) => TResult;