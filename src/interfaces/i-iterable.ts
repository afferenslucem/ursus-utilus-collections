import { IIterator } from "./i-iterator";

export interface IIterable<T> {
   /**
     * Returns iterator for collection
     * Triggers computation
     */
    [Symbol.iterator](): IIterator<T>;

   /**
     * Returns iterator for collection
     * Triggers computation
     */
    getIterator(): IIterator<T>;
}