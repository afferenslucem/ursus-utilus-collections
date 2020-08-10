import { Aggregator } from "./aggregator";
import { ICollection } from "../interfaces/i-collection";
import { FilterCondition } from "../commands/delegates";
import { Exception } from "../exceptions/exceptions";
import { IIteratorData } from "../interfaces/i-iterator-data";
import { LAST_ITERATOR_ITEM } from "../iterators/last-iterator-item";
import { IIterator } from "../interfaces/i-iterator";

export class LastAggregator<T> extends Aggregator<T> {
    public constructor(private collection: ICollection<T>, protected predicate?: FilterCondition<T> | undefined){
        super();
    }

    public aggregate(): T {
        const result = this.findLast();

        if (result.done) {
            throw Exception.NoMatches;
        } else {
            // @ts-ignore
            return result.value;
        }
    }
    
    private findLast(): IIteratorData<T> {
        const iterator = this.getIterator();

        let prev = LAST_ITERATOR_ITEM;
        let current = LAST_ITERATOR_ITEM;

        do {
            prev = current;
            current = iterator.next();
        } while (!current.done);

        return prev;
    }


    private getIterator(): IIterator<T> {
        return this.predicate ? 
        this.collection.where(this.predicate).getIterator() :
        this.collection.getIterator();
    }
}