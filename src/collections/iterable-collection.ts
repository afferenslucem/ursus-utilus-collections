import { IIterator } from "../interfaces/i-iterator";
import { IIterable } from "../interfaces/i-iterable";

export abstract class IterableCollection<T> implements IIterable<T> {
    protected constructor(){}

    public [Symbol.iterator](): IIterator<T> {
        return this.getIterator();
    }

    public abstract getIterator(): IIterator<T>;

    public abstract materialize(): T[];
}