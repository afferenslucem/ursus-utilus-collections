import { IterableCollection } from "./iterable-collection";

export class NativeArrayWrapper<T> extends IterableCollection<T> {
    private items: T[];

    public constructor(items: T[]) {
        super();

        this.items = items;
    }

    public getIterator(): IterableIterator<T> {
       return this.items[Symbol.iterator]();
    }

    public materialize(): T[] {
        return this.items;
    }
}