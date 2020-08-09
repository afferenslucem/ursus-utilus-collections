import { IteratorWrapper } from "./iterator-wrapper";
import { IIterator } from "../interfaces/i-iterator";
import { IIteratorData } from "../interfaces/i-iterator-data";
import { LAST_ITERATOR_ITEM } from "./last-iterator-item";

export class TakingIterator<T> extends IteratorWrapper<T> {
    private isDone = false;
    private taken = 0;

    public constructor(iterator: IIterator<T>, private shouldTake: number) {
        super(iterator);
    }

    public next(): IIteratorData<T> {
        if(this.isDone || this.taken == this.shouldTake) {
            return this.onFinished();
        } else {
            this.taken++;
            return this.inner.next();
        }
    }
}