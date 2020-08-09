import { IteratorWrapper } from "./iterator-wrapper";
import { IIterator } from "../interfaces/i-iterator";
import { IIteratorData } from "../interfaces/i-iterator-data";
import { LAST_ITERATOR_ITEM } from "./last-iterator-item";

export class SkippingIterator<T> extends IteratorWrapper<T> {
    private isDone = false;

    public constructor(iterator: IIterator<T>, private shouldSkip: number) {
        super(iterator);
        this.skip();
    }

    public next(): IIteratorData<T> {
        if(this.isDone) {
            return this.onFinished();
        } else {
            return this.inner.next();
        }
    }

    private skip(): void {
        let i = 0;
        while(i < this.shouldSkip) {
            const done = this.inner.next().done;

            if (done) {
                this.isDone = true;
                return;
            } else {
                i++;
            }
        }
    }
}