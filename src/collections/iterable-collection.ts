import { IIterator } from "../interfaces/i-iterator";
import { IIterable } from "../interfaces/i-iterable";

export abstract class IterableCollection<T> implements IIterable<T> {
    protected constructor(protected iterator: IIterator<T>){}

    public [Symbol.iterator](): IIterator<T> {
        return this.iterator;
    }
}