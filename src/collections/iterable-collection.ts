import { IIterable } from "../interfaces/i-iterable";

export abstract class IterableCollection<T> implements IIterable<T> {
    protected constructor(){}

    public [Symbol.iterator](): IterableIterator<T> {
        return this.getIterator();
    }

    public abstract getIterator(): IterableIterator<T>;

    protected abstract materialize(): T[];
}