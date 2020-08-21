export interface IIterable<T> {
   /**
     * Returns iterator for collection
     * Triggers computation
     */
    [Symbol.iterator](): IterableIterator<T>;

   /**
     * Returns iterator for collection
     * Triggers computation
     */
    getIterator(): IterableIterator<T>;
}