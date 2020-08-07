import { IIterator } from "./i-iterator";

export interface IIterable<T> {
    [Symbol.iterator](): IIterator<T>;
    getIterator(): IIterator<T>;
}