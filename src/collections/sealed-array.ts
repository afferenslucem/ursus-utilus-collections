import { IIterator } from "../interfaces/i-iterator";
import { IteratorLinter as IteratorLinter } from "../iterators/iterator-linter";
import { NativeArrayWrapper } from "./native-array-wrapper";
import { IterableCollection } from "./iterable-collection";

export class SealedArray<T> extends IterableCollection<T> {
    public static from<T>(batch: T[]): SealedArray<T> {
        const copy = Array.from(batch);

        const wrapper = new NativeArrayWrapper<T>(...copy);

        return new SealedArray(wrapper);
    }

    private constructor(...iterables: IterableCollection<T>[]) {
        super(new IteratorLinter<T>(...iterables.map(item => item[Symbol.iterator]())))
    }
}