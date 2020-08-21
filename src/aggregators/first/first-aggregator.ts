import { Aggregator } from "../aggregator";
import { ICollection } from "../../interfaces/i-collection";
import { FilterCondition } from "../../commands/delegates";
import { Exception } from "../../exceptions/exceptions";

export class FirstAggregator<T> extends Aggregator<T> {
    public constructor(private collection: ICollection<T>, protected predicate?: FilterCondition<T> | undefined){
        super();
    }

    public aggregate(): T {
        const result = this.findFirst();

        if (result.done) {
            throw Exception.NoMatches;
        } else {
            // @ts-ignore
            return result.value;
        }
    }
    
    private findFirst(): IteratorResult<T> {
        return this.predicate ? 
        this.collection.where(this.predicate).getIterator().next() :
        this.collection.getIterator().next();
    }
}