import { NativeArrayIterator } from "../iterators/native-array-iterator";
import { IterableCollection } from "./iterable-collection";
import { IIterator } from "../interfaces/i-iterator";

export class NativeArrayWrapper<T> extends IterableCollection<T> {
    private items: T[];

    public constructor(items: T[]) {
        super();

        this.items = items;
    }

    public getIterator(): IIterator<T> {
       return new NativeArrayIterator(this.items)
    }
}