import { Aggregator } from "./aggregator";
import { ReduceCondition } from "../commands/delegates";
import { ICollection } from "../interfaces/i-collection";

export class ReduceAggregator<T> extends Aggregator<T> {
    public constructor(private collection: ICollection<T>, protected predicate: ReduceCondition<T>){
        super();
    }

    public aggregate(): T {
        return this.collection.toArray().reduce(this.predicate)
    }
}