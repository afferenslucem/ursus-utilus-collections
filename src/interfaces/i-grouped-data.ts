import { ISequence } from "./i-sequence";

export interface IGroupedData<K, T> {
    key: K;
    group: T
}