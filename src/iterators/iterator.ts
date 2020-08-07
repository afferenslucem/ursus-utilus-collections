import { IIteratorData } from "../interfaces/i-iterator-data";
import { LAST_ITERATOR_ITEM } from "./last-iterator-item";
import { IIterator } from "../interfaces/i-iterator";

export abstract class Iterator<T> implements IIterator<T> {
    protected constructor () {

    }

    public abstract next(): IIteratorData<T>;

    protected onFinished(): IIteratorData<T> {
        return LAST_ITERATOR_ITEM;
    }

    protected abstract getFinished(): boolean;
    
    protected get finished(): boolean {
        return this.getFinished();
    }
}