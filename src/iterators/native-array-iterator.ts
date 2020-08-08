import { IIteratorData } from "../interfaces/i-iterator-data";
import { LAST_ITERATOR_ITEM } from "./last-iterator-item";
import { Iterator } from "./iterator";

export class NativeArrayIterator<T> extends Iterator<T> {
    private current: number;
    private items: T[];

    public constructor(...items: T[]) {
        super();

        this.items = items;
        this.current = 0;
    }

    next(): IIteratorData<T> {
        if (this.finished) {
            this.reset();
            return LAST_ITERATOR_ITEM;
        }

        const result = {
            value: this.items[this.current],
            done: false
        }

        this.current++;

        return result;
    }

    private reset(): void {
        this.current = 0;
    }
    
    public getFinished(): boolean {
        return this.current == this.items.length;
    }
}