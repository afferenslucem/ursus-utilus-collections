import { ICollection } from "./i-collection";

export interface IGroupedData<K, T> {
    key: K;
    group: T
}