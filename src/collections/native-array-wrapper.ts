import { NativeArrayIterator } from "../iterators/native-array-iterator";
import { IterableCollection } from "./iterable-collection";

export class NativeArrayWrapper<T> extends IterableCollection<T> {
    public constructor(...items: T[]) {
        super(new NativeArrayIterator(...items));
    }
}