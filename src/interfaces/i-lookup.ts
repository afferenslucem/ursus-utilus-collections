export interface ILookup<TKey, TElement> {
    /**
     * Returns count of elements
     */
    count: number;

    /**
     * Returns values for specified key
     * @param key Key for search
     */
    get(key: TKey): TElement[];

    /**
     * Check existing of key
     * @param item Item for check
     */
    contains(ket: TKey): boolean;
    
    /**
     * Returns array with key/value tuples
     */
    entries(): Array<[TKey, TElement[]]>    
}