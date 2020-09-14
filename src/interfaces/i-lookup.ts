export interface ILookup<TKey, TElement> {
    count: number;

    get(key: TKey): TElement[];
    contains(ket: TKey): boolean;
    entries(): Array<[TKey, TElement[]]>
}