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
        const result = this.getResult();

        if (result.length == 0) {
            throw Exception.NoMatches;
        } else {
            // @ts-ignore
            return result[result.length - 1];
        }
    }

    private getResult(): T[] {
        return this.predicate ? 
        this.collection.where(this.predicate).toArray() :
        this.collection.toArray();
    }
}