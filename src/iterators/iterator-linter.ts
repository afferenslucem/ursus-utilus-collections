import { Iterator } from "./iterator";
import { IIteratorData } from "../interfaces/i-iterator-data";
import { LAST_ITERATOR_ITEM } from "./last-iterator-item";
import { IIterator } from "../interfaces/i-iterator";

export class IteratorLinter<T> extends Iterator<T> {
    private currentIterator: IIterator<T>;
    private currentIteratorIndex: number;

    private innerIterators: IIterator<T>[];

    public constructor(...iterators: IIterator<T>[]) {
        super();
        this.innerIterators = iterators;
        this.currentIterator = this.innerIterators[0];
        this.currentIteratorIndex = 0;
    }

    public next(): IIteratorData<T> {
        if (this.finished) {
            return LAST_ITERATOR_ITEM;
        }

        let result = this.currentIterator.next();

        if (result.done) {
            this.currentIterator = this.getNextIterator();
            return this.next();
        }
            
        return result;
    }

    private getNextIterator(): IIterator<T> {
        this.currentIteratorIndex++;

        const result = this.innerIterators[this.currentIteratorIndex];

        return result;
    }

    protected getFinished(): boolean {
        return this.currentIterator == undefined;
    }
}