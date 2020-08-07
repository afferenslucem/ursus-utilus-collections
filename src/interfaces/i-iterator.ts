import { IIteratorData } from "./i-iterator-data";

export interface IIterator<T> {
    next(): IIteratorData<T>;
}